import AppError from "../../utils/AppError.js";

const registry = new Map();

export function registerResource(config) {
  if (!config?.key) {
    throw new Error("Resource config requires a key");
  }
  registry.set(config.key, config);
  return config;
}

export function getResource(key) {
  return registry.get(key) || null;
}

export function listResources() {
  return [...registry.values()];
}

export function requireResource(key) {
  const resource = getResource(key);
  if (!resource) {
    throw new AppError(
      `Unknown import/export resource: ${key}`,
      404,
      "RESOURCE_NOT_FOUND",
    );
  }
  return resource;
}

export function getResourcePermission(resource, action) {
  const map = resource.permissions || {};
  return map[action] || null;
}
