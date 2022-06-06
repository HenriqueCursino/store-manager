const formatErrorObj = (message, code) => ({ err: { code, message } });

const generateErrorObj = (type, message) => ({ type, message });

const errorMiddleware = ({ type, message }, _req, res, _next) => {
  if (type) {
    switch (type) {
      case 'invalid_data':
        return res.status(422).json(formatErrorObj(message, type));
      case 'not_found':
        return res.status(404).json(formatErrorObj(message, type));
      default:
        break;
    }
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
  errorMiddleware,
  generateErrorObj,
};
