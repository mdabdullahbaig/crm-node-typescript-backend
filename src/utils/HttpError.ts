class HttpError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }

  static BadRequest(message?: string) {
    return new HttpError(400, message || "400 Bad Request");
  }

  static Unauthorized(message?: string) {
    return new HttpError(401, message || "401 Unauthorized");
  }

  static Forbidden(message?: string) {
    return new HttpError(403, message || "403 Forbidden");
  }

  static NotFound(message?: string) {
    return new HttpError(404, message || "404 Not Found");
  }

  static InternalServerError(message?: string) {
    return new HttpError(500, message || "500 Internal Server Error");
  }
}

export default HttpError;
