const ensureIndex = async (collection, keys, options = {}) => {
  await collection.createIndex(keys, options);
};

export const up = async (db) => {
  await ensureIndex(db.collection("users"), { email: 1 }, { unique: true });
  await ensureIndex(db.collection("users"), { phone: 1 }, { unique: true, sparse: true });
  await ensureIndex(db.collection("users"), { status: 1 });
  await ensureIndex(db.collection("users"), { deletedAt: 1 });

  await ensureIndex(db.collection("roles"), { name: 1 }, { unique: true });
  await ensureIndex(db.collection("roles"), { priority: -1 });

  await ensureIndex(
    db.collection("permissions"),
    { module: 1, action: 1, resource: 1 },
    { unique: true }
  );

  await ensureIndex(
    db.collection("userroles"),
    { user: 1, role: 1 },
    { unique: true }
  );
  await ensureIndex(db.collection("userroles"), { role: 1 });

  await ensureIndex(
    db.collection("rolepermissions"),
    { role: 1, permission: 1 },
    { unique: true }
  );
  await ensureIndex(db.collection("rolepermissions"), { permission: 1 });

  await ensureIndex(db.collection("userdevices"), { user: 1 });
  await ensureIndex(db.collection("userdevices"), { user: 1, lastUsedAt: -1 });

  await ensureIndex(db.collection("sessions"), { user: 1, isActive: 1 });
  await ensureIndex(
    db.collection("sessions"),
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  await ensureIndex(db.collection("refreshtokens"), { user: 1 });
  await ensureIndex(
    db.collection("refreshtokens"),
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  await ensureIndex(db.collection("loginhistories"), { user: 1, createdAt: -1 });
  await ensureIndex(db.collection("loginhistories"), { email: 1, createdAt: -1 });

  await ensureIndex(db.collection("otpcodes"), { user: 1, purpose: 1 });
  await ensureIndex(
    db.collection("otpcodes"),
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  await ensureIndex(db.collection("emailverifications"), { user: 1 });
  await ensureIndex(
    db.collection("emailverifications"),
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  await ensureIndex(db.collection("passwordresettokens"), { user: 1 });
  await ensureIndex(
    db.collection("passwordresettokens"),
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  await ensureIndex(db.collection("auditlogs"), { user: 1, createdAt: -1 });
  await ensureIndex(db.collection("auditlogs"), {
    module: 1,
    resource: 1,
    resourceId: 1,
  });
  await ensureIndex(db.collection("auditlogs"), { createdAt: -1 });

  await ensureIndex(
    db.collection("socialaccounts"),
    { provider: 1, providerUserId: 1 },
    { unique: true }
  );
  await ensureIndex(db.collection("socialaccounts"), { user: 1 });
};

const dropIndexSafe = async (collection, keys) => {
  try {
    await collection.dropIndex(keys);
  } catch (error) {
    if (error.codeName !== "IndexNotFound") throw error;
  }
};

export const down = async (db) => {
  await dropIndexSafe(db.collection("users"), { email: 1 });
  await dropIndexSafe(db.collection("users"), { phone: 1 });
  await dropIndexSafe(db.collection("users"), { status: 1 });
  await dropIndexSafe(db.collection("users"), { deletedAt: 1 });

  await dropIndexSafe(db.collection("roles"), { name: 1 });
  await dropIndexSafe(db.collection("roles"), { priority: -1 });

  await dropIndexSafe(db.collection("permissions"), {
    module: 1,
    action: 1,
    resource: 1,
  });

  await dropIndexSafe(db.collection("userroles"), { user: 1, role: 1 });
  await dropIndexSafe(db.collection("userroles"), { role: 1 });

  await dropIndexSafe(db.collection("rolepermissions"), { role: 1, permission: 1 });
  await dropIndexSafe(db.collection("rolepermissions"), { permission: 1 });

  await dropIndexSafe(db.collection("userdevices"), { user: 1 });
  await dropIndexSafe(db.collection("userdevices"), { user: 1, lastUsedAt: -1 });

  await dropIndexSafe(db.collection("sessions"), { user: 1, isActive: 1 });
  await dropIndexSafe(db.collection("sessions"), { expiresAt: 1 });

  await dropIndexSafe(db.collection("refreshtokens"), { user: 1 });
  await dropIndexSafe(db.collection("refreshtokens"), { expiresAt: 1 });

  await dropIndexSafe(db.collection("loginhistories"), { user: 1, createdAt: -1 });
  await dropIndexSafe(db.collection("loginhistories"), { email: 1, createdAt: -1 });

  await dropIndexSafe(db.collection("otpcodes"), { user: 1, purpose: 1 });
  await dropIndexSafe(db.collection("otpcodes"), { expiresAt: 1 });

  await dropIndexSafe(db.collection("emailverifications"), { user: 1 });
  await dropIndexSafe(db.collection("emailverifications"), { expiresAt: 1 });

  await dropIndexSafe(db.collection("passwordresettokens"), { user: 1 });
  await dropIndexSafe(db.collection("passwordresettokens"), { expiresAt: 1 });

  await dropIndexSafe(db.collection("auditlogs"), { user: 1, createdAt: -1 });
  await dropIndexSafe(db.collection("auditlogs"), {
    module: 1,
    resource: 1,
    resourceId: 1,
  });
  await dropIndexSafe(db.collection("auditlogs"), { createdAt: -1 });

  await dropIndexSafe(db.collection("socialaccounts"), {
    provider: 1,
    providerUserId: 1,
  });
  await dropIndexSafe(db.collection("socialaccounts"), { user: 1 });
};
