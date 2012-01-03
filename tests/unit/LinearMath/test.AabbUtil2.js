module( 'Bump.AabbUtil2' );

test( 'AabbUtil2 exists', function() {
  var aabb = Bump.AabbUtil2 || {};

  ok( aabb.aabbExpand, 'Bump.AabbUtil2.aabbExpand' );
  ok( aabb.testPointAgainstAabb2, 'Bump.AabbUtil2.testPointAgainstAabb2' );
  ok( aabb.testAabbAgainstAabb2, 'Bump.AabbUtil2.testAabbAgainstAabb2' );
  ok( aabb.testTriangleAgainstAabb2, 'Bump.AabbUtil2.testTriangleAgainstAabb2' );
  ok( aabb.outcode, 'Bump.AabbUtil2.outcode' );
  ok( aabb.rayAabb2, 'Bump.AabbUtil2.rayAabb2' );
  ok( aabb.rayAabb, 'Bump.AabbUtil2.rayAabb' );
  ok( aabb.transformAabb, 'Bump.AabbUtil2.transformAabb' );
  ok( aabb.testQuantizedAabbAgainstQuantizedAabb, 'Bump.AabbUtil2.testQuantizedAabbAgainstQuantizedAabb' );
});

module( 'Bump.AabbUtil2.aabbExpand' );

test( 'basic', function() {
  var aabbMin = Bump.Vector3.create( 1, 2, 3 ),
      aabbMinRef = aabbMin,
      aabbMax = Bump.Vector3.create( 2, 3, 4 ),
      aabbMaxRef = aabbMax,
      expansionMin = Bump.Vector3.create( -1, -1, -1 ),
      expansionMinRef = expansionMin,
      expansionMinClone = expansionMin.clone(),
      expansionMax = Bump.Vector3.create( 1, 1, 1 ),
      expansionMaxRef = expansionMax,
      expansionMaxClone = expansionMax.clone();

  Bump.AabbUtil2.aabbExpand( aabbMin, aabbMax, expansionMin, expansionMax );

  strictEqual( aabbMin, aabbMinRef, 'aabbMin is not reallocated' );
  strictEqual( aabbMax, aabbMaxRef, 'aabbMax is not reallocated' );
  strictEqual( expansionMin, expansionMinRef, 'expansionMin is not reallocated' );
  strictEqual( expansionMax, expansionMaxRef, 'expansionMax is not reallocated' );
  deepEqual( expansionMin, expansionMinClone, 'expansionMin is not changed' );
  deepEqual( expansionMax, expansionMaxClone, 'expansionMax is not changed' );
});

module( 'Bump.AabbUtil2.testPointAgainstAabb2' );

test( 'basic', function() {
  var aabbMin = Bump.Vector3.create( 1, 2, 3 ),
      aabbMinRef = aabbMin,
      aabbMinClone = aabbMin.clone(),
      aabbMax = Bump.Vector3.create( 2, 3, 4 ),
      aabbMaxRef = aabbMax,
      aabbMaxClone = aabbMax.clone(),
      a = Bump.Vector3.create(),
      aRef = a,
      aClone = a.clone(),
      b = Bump.Vector3.create( 1.5, 2.5, 3.5 ),
      bRef = b,
      bClone = b.clone();

  equal( Bump.AabbUtil2.testPointAgainstAabb2( aabbMin, aabbMax, a ), false );
  equal( Bump.AabbUtil2.testPointAgainstAabb2( aabbMin, aabbMax, b ), true );

  strictEqual( aabbMin, aabbMinRef, 'aabbMin is not reallocated' );
  strictEqual( aabbMax, aabbMaxRef, 'aabbMax is not reallocated' );
  deepEqual( aabbMin, aabbMinClone, 'aabbMin is not changed' );
  deepEqual( aabbMax, aabbMaxClone, 'aabbMax is not changed' );

  strictEqual( a, aRef, 'a is not reallocated' );
  strictEqual( b, bRef, 'b is not reallocated' );
  deepEqual( a, aClone, 'a is not changed' );
  deepEqual( b, bClone, 'b is not changed' );
});

module( 'Bump.AabbUtil2.testAabbAgainstAabb2' );

test( 'basic', function() {
  var aMin = Bump.Vector3.create( 0, 0, 0 ),
      aMinRef = aMin,
      aMinClone = aMin.clone(),
      aMax = Bump.Vector3.create( 1, 1, 1 ),
      aMaxRef = aMax,
      aMaxClone = aMax.clone(),
      bMin = Bump.Vector3.create( 0.5, 0.5, 0.5 ),
      bMinRef = bMin,
      bMinClone = bMin.clone(),
      bMax = Bump.Vector3.create( 1.5, 1.5, 1.5 ),
      bMaxRef = bMax,
      bMaxClone = bMax.clone(),
      cMin = Bump.Vector3.create( 1 + Math.pow( 2, -52 ), 0, 0 ),
      cMinRef = cMin,
      cMinClone = cMin.clone(),
      cMax = Bump.Vector3.create( 2 + Math.pow( 2, -52 ), 1, 1 ),
      cMaxRef = cMax,
      cMaxClone = cMax.clone();

  equal( Bump.AabbUtil2.testAabbAgainstAabb2( aMin, aMax, bMin, bMax ), true );
  equal( Bump.AabbUtil2.testAabbAgainstAabb2( aMin, aMax, cMin, cMax ), false );
  equal( Bump.AabbUtil2.testAabbAgainstAabb2( bMin, bMax, cMin, cMax ), true );
  equal( Bump.AabbUtil2.testAabbAgainstAabb2( bMin, bMax, aMin, aMax ), true );
  equal( Bump.AabbUtil2.testAabbAgainstAabb2( cMin, cMax, aMin, aMax ), false );
  equal( Bump.AabbUtil2.testAabbAgainstAabb2( cMin, cMax, bMin, bMax ), true );

  strictEqual( aMin, aMinRef, 'aMin is not reallocated' );
  strictEqual( aMax, aMaxRef, 'aMax is not reallocated' );
  strictEqual( bMin, bMinRef, 'bMin is not reallocated' );
  strictEqual( bMax, bMaxRef, 'bMax is not reallocated' );
  strictEqual( cMin, cMinRef, 'cMin is not reallocated' );
  strictEqual( cMax, cMaxRef, 'cMax is not reallocated' );

  deepEqual( aMin, aMinClone, 'aMin is not changed' );
  deepEqual( aMax, aMaxClone, 'aMax is not changed' );
  deepEqual( bMin, bMinClone, 'bMin is not changed' );
  deepEqual( bMax, bMaxClone, 'bMax is not changed' );
  deepEqual( cMin, cMinClone, 'cMin is not changed' );
  deepEqual( cMax, cMaxClone, 'cMax is not changed' );
});

module( 'Bump.AabbUtil2.testTriangleAgainstAabb2' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});

module( 'Bump.AabbUtil2.outcode' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});

module( 'Bump.AabbUtil2.rayAabb2' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});

module( 'Bump.AabbUtil2.rayAabb' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});

module( 'Bump.AabbUtil2.transformAabb' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});

module( 'Bump.AabbUtil2.testQuantizedAabbAgainstQuantizedAabb' );

test( 'basic', function() {
  ok( true, 'test skipped' );
});
