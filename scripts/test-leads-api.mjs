/**
 * Comprehensive API Test Suite for D9W Leads Endpoint (/api/leads)
 */

import http from 'http'
import handler from '../api/leads.ts'

function mockRequest(method, body = null, ip = '127.0.0.1') {
  const req = new http.IncomingMessage(null)
  req.method = method
  req.headers = {
    'content-type': 'application/json',
    'x-forwarded-for': ip,
  }

  const rawBody = body ? JSON.stringify(body) : ''
  req.push(rawBody)
  req.push(null)

  return req
}

function mockResponse() {
  const res = new http.ServerResponse({ method: 'POST' })
  let body = ''

  return {
    res,
    promise: new Promise((resolve) => {
      res.end = (chunk) => {
        if (chunk) body += chunk
        resolve({
          statusCode: res.statusCode,
          body: (() => {
            try {
              return JSON.parse(body)
            } catch {
              return body
            }
          })(),
          headers: res.getHeaders(),
        })
      }
    }),
  }
}

async function runTests() {
  console.log('=== Starting D9W Leads API Verification Test Suite ===\n')
  let passed = 0
  let failed = 0

  function assert(name, condition, message = '') {
    if (condition) {
      console.log(`✓ PASS: ${name}`)
      passed++
    } else {
      console.error(`✗ FAIL: ${name} — ${message}`)
      failed++
    }
  }

  // TEST 1: Reject Non-POST (GET)
  {
    const req = mockRequest('GET', null, '192.168.1.1')
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert('Method Not Allowed (GET -> 405)', result.statusCode === 405, `Received: ${result.statusCode}`)
  }

  // TEST 2: Missing Required Fields
  {
    const req = mockRequest('POST', { fullName: '' }, '192.168.1.2')
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert(
      'Missing required fields returns 400',
      result.statusCode === 400 && result.body.code === 'VALIDATION_FAILED',
      JSON.stringify(result.body)
    )
  }

  // TEST 3: Invalid Email Rejection
  {
    const req = mockRequest(
      'POST',
      {
        fullName: 'Johannes Schmidt',
        phone: '+49 1520 1234567',
        email: 'not-an-email',
        courseLevel: 'A1',
        learningMode: 'Online',
        enquiryType: 'Course Enquiry',
        privacyConsent: true,
      },
      '192.168.1.3'
    )
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert(
      'Invalid email format rejected with 400',
      result.statusCode === 400 && result.body.details.some((d) => d.includes('Email')),
      JSON.stringify(result.body)
    )
  }

  // TEST 4: Invalid CEFR Level Rejection
  {
    const req = mockRequest(
      'POST',
      {
        fullName: 'Johannes Schmidt',
        phone: '+49 1520 1234567',
        courseLevel: 'Z9',
        learningMode: 'Online',
        enquiryType: 'Course Enquiry',
        privacyConsent: true,
      },
      '192.168.1.4'
    )
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert(
      'Invalid CEFR level rejected with 400',
      result.statusCode === 400 && result.body.details.some((d) => d.includes('course level')),
      JSON.stringify(result.body)
    )
  }

  // TEST 5: Honeypot Rejection
  {
    const req = mockRequest(
      'POST',
      {
        fullName: 'Spam Bot',
        phone: '+1 555 1234567',
        courseLevel: 'A1',
        learningMode: 'Online',
        enquiryType: 'General Consultation',
        privacyConsent: true,
        instituteReferralCode: 'SPAMMER_BOT_FILL',
      },
      '192.168.1.5'
    )
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert(
      'Honeypot field drops bot quietly (200 without CRM sync)',
      result.statusCode === 200 && result.body.success === true,
      JSON.stringify(result.body)
    )
  }

  // TEST 6: Valid Submission in Local Dev Mock Mode
  const testIdempKey = `test_key_${Date.now()}`
  let returnedLeadId = ''
  const testIp = '192.168.1.6'
  {
    const req = mockRequest(
      'POST',
      {
        fullName: 'Clara Schumann',
        phone: '+49 170 9876543',
        email: 'clara@example.com',
        courseLevel: 'B1',
        learningMode: 'Online',
        enquiryType: 'Course Enquiry',
        preferredContactTime: 'Evening',
        message: 'Need B1 exam preparation for job in Munich.',
        privacyConsent: true,
        source: 'Course Comparison',
        idempotencyKey: testIdempKey,
      },
      testIp
    )
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    returnedLeadId = result.body.leadId
    assert(
      'Valid submission returns 200 with formatted Lead ID',
      result.statusCode === 200 &&
        result.body.success === true &&
        /^D9W-202[0-9]-[0-9]{6}$/.test(result.body.leadId),
      JSON.stringify(result.body)
    )
  }

  // TEST 7: Idempotent Resubmission with Same Key
  {
    const req = mockRequest(
      'POST',
      {
        fullName: 'Clara Schumann',
        phone: '+49 170 9876543',
        courseLevel: 'B1',
        learningMode: 'Online',
        enquiryType: 'Course Enquiry',
        privacyConsent: true,
        source: 'Course Comparison',
        idempotencyKey: testIdempKey,
      },
      testIp
    )
    const { res, promise } = mockResponse()
    await handler(req, res)
    const result = await promise
    assert(
      'Duplicate submission returns identical Lead ID (Idempotency guarantee)',
      result.statusCode === 200 &&
        result.body.leadId === returnedLeadId &&
        result.body.message.includes('duplicate request acknowledged'),
      JSON.stringify(result.body)
    )
  }

  // TEST 8: Rate Limiter Protection (exceed 5 requests on one IP)
  {
    const spamIp = '192.168.1.99'
    let hitRateLimit = false
    for (let i = 0; i < 6; i++) {
      const req = mockRequest('POST', { fullName: '' }, spamIp)
      const { res, promise } = mockResponse()
      await handler(req, res)
      const result = await promise
      if (result.statusCode === 429) {
        hitRateLimit = true
        break
      }
    }
    assert('Rate limiter enforces max requests per minute (429)', hitRateLimit)
  }

  console.log(`\n=== Test Results: ${passed} Passed, ${failed} Failed ===`)
  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal error running tests:', err)
  process.exit(1)
})
