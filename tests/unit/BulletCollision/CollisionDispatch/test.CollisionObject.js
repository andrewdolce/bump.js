var CollisionObjectDeepCopyCheck = function( a, b ) {
  notStrictEqual( a.worldTransform, b.worldTransform );
  notStrictEqual( a.interpolationWorldTransform, b.interpolationWorldTransform );
  notStrictEqual( a.interpolationLinearVelocity, b.interpolationLinearVelocity );
  notStrictEqual( a.interpolationAngularVelocity, b.interpolationAngularVelocity );
  notStrictEqual( a.anisotropicFriction, b.anisotropicFriction );

  strictEqual( a.broadphaseHandle, b.broadphaseHandle );
  strictEqual( a.collisionShape, b.collisionShape );
  strictEqual( a.extensionPointer, b.extensionPointer );
  strictEqual( a.rootCollisionShape, b.rootCollisionShape );
  strictEqual( a.userObjectPointer, b.userObjectPointer );
};

var CollisionObjectPointerMembers = [
  'broadphaseHandle',
  'collisionShape',
  'extensionPointer',
  'rootCollisionShape',
  'userObjectPointer'
];

module( 'CollisionObject.create' );

test( 'basic', function() {
  ok( Bump.CollisionObject, 'CollisionObject exists' );

  var co = Bump.CollisionObject.create();
  ok( co, 'creates an object' );
  ok( co instanceof Bump.CollisionObject.prototype.constructor );
});

test( 'correct types', function() {
  var co = Bump.CollisionObject.create();

  var checks = [
    [ 'worldTransform',               Bump.Transform ],
    [ 'interpolationWorldTransform',  Bump.Transform ],
    [ 'interpolationLinearVelocity',  Bump.Vector3   ],
    [ 'interpolationAngularVelocity', Bump.Vector3   ],
    [ 'anisotropicFriction',          Bump.Vector3   ],

    [ 'hasAnisotropicFriction',     'boolean' ],
    [ 'contactProcessingThreshold', 'number'  ],
    [ 'broadphaseHandle',           null      ],
    [ 'collisionShape',             null      ],
    [ 'extensionPointer',           null      ],
    [ 'rootCollisionShape',         null      ],
    [ 'collisionFlags',             'number'  ],
    [ 'islandTag1',                 'number'  ],
    [ 'companionId',                'number'  ],
    [ 'activationState1',           'number'  ],
    [ 'deactivationTime',           'number'  ],
    [ 'friction',                   'number'  ],
    [ 'restitution',                'number'  ],
    [ 'internalType',               'number'  ],
    [ 'userObjectPointer',          null      ],
    [ 'hitFraction',                'number'  ],
    [ 'ccdSweptSphereRadius',       'number'  ],
    [ 'ccdMotionThreshold',         'number'  ],
    [ 'm_checkCollideWith',         'boolean' ]
  ];

  checkTypes( co, checks );
});

test( 'is getters', function() {
  var co = Bump.CollisionObject.create();

  strictEqual( co.isStaticObject(), true );
  strictEqual( co.isKinematicObject(), false );
  strictEqual( co.mergesSimulationIslands(), false );
  strictEqual( co.isStaticOrKinematicObject(), true );
  strictEqual( co.hasContactResponse(), true );
  strictEqual( co.isActive(), true );
});

module( 'CollisionObject enums' );

test( 'enums', function() {
  equal( Bump.CollisionObject.CollisionFlags.CF_STATIC_OBJECT,                    1 << 0, 'CF_STATIC_OBJECT'                    );
  equal( Bump.CollisionObject.CollisionFlags.CF_KINEMATIC_OBJECT,                 1 << 1, 'CF_KINEMATIC_OBJECT'                 );
  equal( Bump.CollisionObject.CollisionFlags.CF_NO_CONTACT_RESPONSE,              1 << 2, 'CF_NO_CONTACT_RESPONSE'              );
  equal( Bump.CollisionObject.CollisionFlags.CF_CUSTOM_MATERIAL_CALLBACK,         1 << 3, 'CF_CUSTOM_MATERIAL_CALLBACK'         );
  equal( Bump.CollisionObject.CollisionFlags.CF_CHARACTER_OBJECT,                 1 << 4, 'CF_CHARACTER_OBJECT'                 );
  equal( Bump.CollisionObject.CollisionFlags.CF_DISABLE_VISUALIZE_OBJECT,         1 << 5, 'CF_DISABLE_VISUALIZE_OBJECT'         );
  equal( Bump.CollisionObject.CollisionFlags.CF_DISABLE_SPU_COLLISION_PROCESSING, 1 << 6, 'CF_DISABLE_SPU_COLLISION_PROCESSING' );

  equal( Bump.CollisionObject.CollisionObjectTypes.CO_COLLISION_OBJECT, 1 << 0, 'CO_COLLISION_OBJECT' );
  equal( Bump.CollisionObject.CollisionObjectTypes.CO_RIGID_BODY,       1 << 1, 'CO_RIGID_BODY'       );
  equal( Bump.CollisionObject.CollisionObjectTypes.CO_GHOST_OBJECT,     1 << 2, 'CO_GHOST_OBJECT'     );
  equal( Bump.CollisionObject.CollisionObjectTypes.CO_SOFT_BODY,        1 << 3, 'CO_SOFT_BODY'        );
  equal( Bump.CollisionObject.CollisionObjectTypes.CO_HF_FLUID,         1 << 4, 'CO_HF_FLUID'         );
  equal( Bump.CollisionObject.CollisionObjectTypes.CO_USER_TYPE,        1 << 5, 'CO_USER_TYPE'        );
});

module( 'CollisionObject.clone' );

test( 'basic', function() {
  var a = Bump.CollisionObject.create();
  var b = a.clone();

  deepEqual( a, b );
  notStrictEqual( a, b );
  CollisionObjectDeepCopyCheck( a, b );
});

module( 'CollisionObject.setActivationState' );

test( 'bare bones', function() {
  var a = Bump.CollisionObject.create();

  testFunc( Bump.CollisionObject, 'setActivationState', {
    ignoreExpected: true,
    modifiesSelf: true,
    objects: a,
    args: [ [ Bump.CollisionObject.DISABLE_SIMULATION ] ]
  });
});

module( 'CollisionObject.activate' );

test( 'bare bones', function() {
  var a = Bump.CollisionObject.create();

  testFunc( Bump.CollisionObject, 'activate', {
    ignoreExpected: true,
    modifiesSelf: true,
    objects: a
  });
});
