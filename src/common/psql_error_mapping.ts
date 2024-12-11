type errorContent = {
  statusCode: number;
  message: string;
};

export const PSQL_ERRORS = new Map<string, errorContent>([
  [
    "23505",
    {
      statusCode: 409,
      message:
        "Conflict - Unique constraint violation.",
    },
  ],
  ["23503", { statusCode: 409, message: "Conflict - Foreign key violation" }],
  [
    "23514",
    { statusCode: 409, message: "Conflict - Check constraint violation" },
  ],
  [
    "23502",
    { statusCode: 400, message: "Bad Request - Null value not allowed" },
  ],
  [
    "22001",
    { statusCode: 400, message: "Bad Request - String exceeds max length" },
  ],
  [
    "40P01",
    { statusCode: 503, message: "Service Unavailable - Deadlock detected" },
  ],
  [
    "42501",
    { statusCode: 403, message: "Forbidden - Insufficient privileges" },
  ],
  [
    "XX000",
    { statusCode: 500, message: "Internal Server Error - Database error" },
  ],
  [
    "08001",
    { statusCode: 500, message: "Internal Server Error - Connection failure" },
  ],
]);
