export const VALUE_SERVICE = {
  READ: ['urn:ads:platform:value-service:value-reader'],
  WRITE: ['urn:ads:platform:value-service:value-writer'],
};

export const FORM_SERVICE = {
  WRITE: [
    'urn:ads:platform:form-service:form-admin',
    'urn:ads:platform:form-service:intake-application',
  ],
};

export const EVENT_SERVICE = {
  WRITE: ['urn:ads:platform:event-service:event-sender'],
};

export const DEFAULT_ADMIN = 'default-admin'; // cc realm role mainly used to perform admin requests

/**
 * Middleware to authorize access based on user roles.
 *
 * @param {string[] | string[][]} allowedRoles - Array or nested array of roles that are allowed to access the resource.
 *
 * This middleware checks if the authenticated user has all the roles specified in the allowedRoles array.
 * If the user has the necessary roles, it calls the next middleware function.
 * Otherwise, it responds with a 403 status code and an error message.
 *
 * NOTE: Empty array means no role is checked
 *
 * Roles should be in the format of `${ADSP service URN id}:${permission}`.
 * For a list of service URN ids and permissions see https://govalta.github.io/adsp-monorepo/services/services.html
 */

export default function authorize(allowedRoles: string[] | string[][]) {
  return (req, res, next) => {
    const { user } = req;

    if (
      allowedRoles &&
      allowedRoles
        .flatMap((roles) => roles)
        .every((role) => user?.roles?.includes(role))
    ) {
      next();
    } else {
      res.status(403).json({
        message: 'You do not have permission to access this resource.',
      });
    }
  };
}
