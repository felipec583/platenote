import pino from "pino";
import pretty from "pino-pretty";
import { pinoHttp } from "pino-http";

export const httpLogger = pinoHttp({
  logger: pino(
    pretty({
      colorize: true,
      singleLine: false,
    })
  ),
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 || res.statusCode >= 500 || err) {
      return "silent";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },

  customAttributeKeys: {
    responseTime: "timeTaken",
  },
  customSuccessMessage(req, res) {
    return `${res.statusCode} success ${req.url}`;
  },
  serializers: {
    timeTaken(timeTaken) {
      return `${timeTaken}MS`;
    },
    req(req) {
      return {
        method: req.method,
        query: req.query,
        params: req.params,
      };
    },
    res(_res) {},
    err(_err) {},
  },
});
