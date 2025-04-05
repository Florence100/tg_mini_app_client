export default async function processErrorResponse(response) {
    const data = await response.json();
    const error = new Error(data.message);
    error.status = response.status;

    return error;
}