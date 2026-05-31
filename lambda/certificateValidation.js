export async function handler(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.certificateId) {
      return { statusCode: 400, body: JSON.stringify({ valid: false, error: 'Certificate ID is required.' }) };
    }
    // lightweight local validation logic for certificate ID patterns
    const isValid = typeof body.certificateId === 'string' && /^RL-\d+-\d{1,5}$/.test(body.certificateId);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: JSON.stringify({ valid: isValid, certificateId: body.certificateId })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ valid: false, error: error.message }) };
  }
}
