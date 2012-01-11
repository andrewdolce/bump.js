module( 'Bump.DbvtAabbMm' );

test( 'DbvtAabbMm exists', function() {
  var dbvtaabbmm = Bump.DbvtAabbMm || {};
  strictEqual( typeof dbvtaabbmm.create, 'function', 'Bump.DbvtAabbMm exists' );
} );

test( 'DbvtAabbMm creation', function() {
  var t = Bump.DbvtAabbMm.create() || {};
  ok( t instanceof Bump.DbvtAabbMm.prototype.init, 'creation without `new` operator' );
});

module( 'Bump.DbvtAabbMm constructors' );

test( 'empty', function() {
  var box = Bump.DbvtAabbMm.create();
  deepEqual( box.mi, Bump.Vector3.create(), 'mi zeroed out' );
  deepEqual( box.mx, Bump.Vector3.create(), 'mx zeroed out' );
} );

test( 'FromCE', function() {
  strictEqual( typeof Bump.DbvtAabbMm.FromCE, 'function', 'FromCE exists' );

  var box = Bump.DbvtAabbMm.FromCE(
    Bump.Vector3.create( ),
    Bump.Vector3.create( 5, 10, 20 )
  );

  deepEqual( box.mi, Bump.Vector3.create( -5, -10, -20 ), 'mi initialized correctly' );
  deepEqual( box.mx, Bump.Vector3.create( 5, 10, 20 ), 'mx initialized correctly' );
} );

test( 'FromCR', function() {
  strictEqual( typeof Bump.DbvtAabbMm.FromCR, 'function', 'FromCR exists' );

  var box = Bump.DbvtAabbMm.FromCR(
    Bump.Vector3.create( ),
    10
  );

  deepEqual( box.mi, Bump.Vector3.create( -10, -10, -10 ), 'mi initialized correctly' );
  deepEqual( box.mx, Bump.Vector3.create( 10, 10, 10 ), 'mx initialized correctly' );
} );

test( 'FromMM', function() {
  strictEqual( typeof Bump.DbvtAabbMm.FromMM, 'function', 'FromMM exists' );

  var min = Bump.Vector3.create( -5, -10, -20 ),
      max = Bump.Vector3.create( 5, 10, 20 ),
      box = Bump.DbvtAabbMm.FromMM( min, max );

  ok( box.mi !== min, 'mi copied' );
  deepEqual( box.mi, min, 'mi value correct' );
  ok( box.mx !== max, 'mx copied' );
  deepEqual( box.mx, max, 'mx value correct' );
} );

test( 'FromPoints', function() {
  strictEqual( typeof Bump.DbvtAabbMm.FromPoints, 'function', 'FromPoints exists' );

  var pts = [
        Bump.Vector3.create( -5, -2, 0 ),
        Bump.Vector3.create(),
        Bump.Vector3.create( -12, -2, 0 ),
        Bump.Vector3.create( 8, 10, 0 ),
        Bump.Vector3.create( 4, 12, -10 ),
      ],
      box = Bump.DbvtAabbMm.FromPoints( pts );

  deepEqual( box.mi, Bump.Vector3.create( -12, -2, -10 ), 'mi value correct' );
  deepEqual( box.mx, Bump.Vector3.create( 8, 12, 0 ), 'mx value correct' );
} );

module( 'Bump.DbvtAabbMm member functions' );

(function() {

  // shortcut for making a DbvtAabbMm
  var make = function( mix, miy, miz, mxx, mxy, mxz ) {
    var box = Bump.DbvtAabbMm.create();
    box.mi.setValue( mix, miy, miz );
    box.mx.setValue( mxx, mxy, mxz );
    return box;
  };

  test( 'Center', function() {
    var objs = [
          make( -10, -10, -10, 10, 10, 10 ),
          make( 2, 0, -4, 4, 6, 12 ),
        ],
        expected = [
          Bump.Vector3.create(),
          Bump.Vector3.create( 3, 3, 4 ),
        ];
    testUnaryOp( Bump.DbvtAabbMm, 'Center', objs, expected, {
      destType: Bump.Vector3 } );

  } );

  test( 'Lengths', function() {
    var objs = [
          make( -10, -10, -10, 10, 10, 10 ),
          make( 2, 0, -4, 4, 6, 12 ),
        ],
        expected = [
          Bump.Vector3.create( 20, 20, 20 ),
          Bump.Vector3.create( 2, 6, 16 ),
        ];
    testUnaryOp( Bump.DbvtAabbMm, 'Lengths', objs, expected, {
      destType: Bump.Vector3 } );

  } );

  test( 'Extents', function() {
    var objs = [
          make( -10, -10, -10, 10, 10, 10 ),
          make( 2, 0, -4, 4, 6, 12 ),
        ],
        expected = [
          Bump.Vector3.create( 10, 10, 10 ),
          Bump.Vector3.create( 1, 3, 8 ),
        ];
    testUnaryOp( Bump.DbvtAabbMm, 'Extents', objs, expected, {
      destType: Bump.Vector3 } );

  } );

  test( 'Mins', function() {
    var objs = [
          make( -10, -10, -10, 10, 10, 10 ),
          make( 2, 0, -4, 4, 6, 12 ),
        ],
        expected = [
          Bump.Vector3.create( -10, -10, -10 ),
          Bump.Vector3.create( 2, 0, -4 ),
        ];
    testUnaryOp( Bump.DbvtAabbMm, 'Mins', objs, expected );

  } );

  test( 'Maxs', function() {
    var objs = [
          make( -10, -10, -10, 10, 10, 10 ),
          make( 2, 0, -4, 4, 6, 12 ),
        ],
        expected = [
          Bump.Vector3.create( 10, 10, 10 ),
          Bump.Vector3.create( 4, 6, 12 ),
        ];
    testUnaryOp( Bump.DbvtAabbMm, 'Maxs', objs, expected );

  } );

  test( 'Expand', function() {
    var box = make( -1, -2, -3, 3, 2, 1 ),
        e = Bump.Vector3.create( 2, 2, 2 ),
        mi = box.mi,
        mx = box.mx,
        expected = make( -3, -4, -5, 5, 4, 3 );

    testBinaryOp( Bump.DbvtAabbMm, 'Expand', box, e, expected, {
      modifiesSelf: true
    } );
    ok( mi === box.mi, 'mi modified in place' );
    ok( mx === box.mx, 'mx modified in place' );
  } );

  test( 'SignedExpand', function() {
    var box = make( -1, -2, -3, 3, 2, 1 ),
        e = Bump.Vector3.create( -2, 2, 0 ),
        mi = box.mi,
        mx = box.mx,
        expected = make( -3, -2, -3, 3, 4, 1 );

    testBinaryOp( Bump.DbvtAabbMm, 'SignedExpand', box, e, expected, {
      modifiesSelf: true
    } );
    ok( mi === box.mi, 'mi modified in place' );
    ok( mx === box.mx, 'mx modified in place' );
  } );

  test( 'Contain', function() {
    var boxA = make( -1, -2, -3, 3, 2, 1 ),
        boxBs = [
          make( -1, -1, -1, 1, 1, 1 ),
          make( -1, -2, -3, 3, 2, 1 ),
          make( 0, -2, -3, 4, 2, 1 ),
          make( -2, -2, -3, 2, 2, 1 ),
          make( -1, -1, -3, 3, 3, 1 ),
          make( -1, -3, -3, 3, 1, 1 ),
          make( -1, -2, -2, 3, 2, 2 ),
          make( -1, -2, -4, 3, 2, 0 ),
          make( -3, -3, -3, 3, 3, 3 ),
        ],
        expected = [
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ];

    testBinaryOp( Bump.DbvtAabbMm, 'Contain', boxA, boxBs, expected );
  } );

  test( 'Classify (TODO)', function() {
    ok( Bump.DbvtAabbMm.prototype.Classify, 'Classify exists' );

    var sqrt3 = Math.sqrt( 3 ),
        box = make( 2/sqrt3, 2/sqrt3, 2/sqrt3, 3/sqrt3, 3/sqrt3, 3/sqrt3 ),
        box2 = make( -1/sqrt3, -1/sqrt3, -1/sqrt3, 1/sqrt3, 1/sqrt3, 1/sqrt3 );
    equal( box.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                         0, 7 ), 1, 'returns 1' );
    equal( box.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                         2, 7 ), 1, 'returns 1' );
    ok( true, 'TODO : Decide what to do about bug and then finish tests.' );
    /*
    equal( box2.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                          0, 7 ), 0, 'returns 0' );
    equal( box.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                         2.5, 7 ), 0, 'returns 0' );
    equal( box.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                         3, 7 ), 0, 'returns 0' );
    equal( box.Classify( Bump.Vector3.create( 1, 1, 1 ).normalize(),
                         4, 7 ), 0, 'returns -1' );
    */
  } );

  test( 'ProjectMinimum (TODO)', function() {
    ok( true, 'TODO' );
  } );

  test( 'AddSpan (TODO)', function() {
    ok( true, 'TODO' );
  } );

  module( 'Bump.DbvtAabbMm associated global functions' );

  test( 'Bump.Intersect.DbvtAabbMm2', function() {
    strictEqual( typeof Bump.Intersect, 'object', 'Bump.Intersect exists' );
    strictEqual( typeof Bump.Intersect.DbvtAabbMm2, 'function', 'Bump.Intersect.DbvtAabbMm2 exists' );

    var box1 = make( -1, -1, -1, 1, 1, 1 ),
        box2 = make( -2, -3, -3, 0, -2, -2 ),
        box3 = make( -3, -2, -3, -2, 0, -2 ),
        box4 = make( -3, -3, -2, -2, -2, 0 ),
        box5 = make( 0, -3, -3, 2, -2, -2 ),
        box6 = make( -3, 0, -3, -2, 2, -2 ),
        box7 = make( -3, -3, 0, -2, -2, 2 ),
        box8 = make( -3, -3, -3, -2, -2, -2 ),
        box9 = make( -2, -2, -2, 2, 2, 2 ),
        box10 = make( 0, 0, 0, 2, 2, 2 ),
        box11 = make( -2, -2, -2, 0, 0, 0 );

    var func = Bump.Intersect.DbvtAabbMm2;
    ok( !func( box1, box2 ), 'no overlap on x axis' );
    ok( !func( box1, box3 ), 'no overlap on y axis' );
    ok( !func( box1, box4 ), 'no overlap on z axis' );
    ok( !func( box1, box5 ), 'no overlap on x axis' );
    ok( !func( box1, box6 ), 'no overlap on y axis' );
    ok( !func( box1, box7 ), 'no overlap on z axis' );
    ok( !func( box1, box8 ), 'no overlap on any axis' );
    ok( func( box1, box9 ), 'overlap on all axes' );
    ok( func( box1, box10 ), 'overlap on all axes' );
    ok( func( box1, box11 ), 'overlap on all axes' );


  } );

  test( 'Bump.Intersect.DbvtAabbMm.Vector3', function() {
    strictEqual( typeof Bump.Intersect, 'object', 'Bump.Intersect exists' );
    strictEqual( typeof Bump.Intersect.DbvtAabbMm, 'object', 'Bump.Intersect.DbvtAabbMm exists' );
    strictEqual( typeof Bump.Intersect.DbvtAabbMm.Vector3, 'function',
                 'Bump.Intersect.DbvtAabbMm exists' );

    var box = make( -1, -1, -1, 1, 1, 1 ),
        vec1 = Bump.Vector3.create(),
        vec2 = Bump.Vector3.create( 1, 1, 1 ),
        vec3 = Bump.Vector3.create( -1, -1, -1 ),
        vec4 = Bump.Vector3.create( 2, 1, 1 ),
        vec5 = Bump.Vector3.create( 1, 2, 1 ),
        vec6 = Bump.Vector3.create( 1, 1, 2 ),
        vec7 = Bump.Vector3.create( 2, 2, 2 );
        vec8 = Bump.Vector3.create( -2, -1, -1 ),
        vec9 = Bump.Vector3.create( -1, -2, -1 ),
        vec10 = Bump.Vector3.create( -1, -1, -2 ),
        vec11 = Bump.Vector3.create( -2, -2, -2 );

    var func = Bump.Intersect.DbvtAabbMm.Vector3;
    ok( func( box, vec1 ), 'origin' );
    ok( func( box, vec2 ), '+X, +Y, +Z corner' );
    ok( func( box, vec3 ), '-X, -Y, -Z corner' );
    ok( !func( box, vec4 ), 'no overlap on x axis' );
    ok( !func( box, vec5 ), 'no overlap on y axis' );
    ok( !func( box, vec6 ), 'no overlap on z axis' );
    ok( !func( box, vec7 ), 'no overlap on any axis' );
    ok( !func( box, vec8 ), 'no overlap on x axis' );
    ok( !func( box, vec9 ), 'no overlap on y axis' );
    ok( !func( box, vec10 ), 'no overlap on z axis' );
    ok( !func( box, vec11 ), 'no overlap on any axis' );

  } );

  test( 'Bump.Proximity.DbvtAabbMm2', function() {
    strictEqual( typeof Bump.Proximity, 'object', 'Bump.Proximity exists' );
    strictEqual( typeof Bump.Proximity.DbvtAabbMm2, 'function', 'Bump.Proximity.DbvtAabbMm2 exists' );

    var box1 = make( -3, -3, -3, -1, -1, -1 ),
        box2 = make( 4, 4, 4, 12, 12, 12 );

    var func = Bump.Proximity.DbvtAabbMm2;
    equal( func( box1, box2 ), 60, 'correct result' );

  } );

  test( 'Bump.Select.DbvtAabbMm3', function() {
    strictEqual( typeof Bump.Select, 'object', 'Bump.Select exists' );
    strictEqual( typeof Bump.Select.DbvtAabbMm3, 'function', 'Bump.Select.DbvtAabbMm3 exists' );

    var box1 = make( -3, -3, -3, -1, -1, -1 ),
        box2 = make( 4, 4, 4, 12, 12, 12 ),
        box3 = make( 1, 1, 1, 5, 5, 5 );

    var func = Bump.Select.DbvtAabbMm3;
    ok( func( box1, box2, box3 ) === 1, 'correct result' );
    ok( func( box1, box3, box2 ) === 0, 'correct result' );
    ok( func( box3, box1, box2 ) === 1, 'correct result' );
    ok( func( box3, box2, box1 ) === 1, 'correct result' );

  } );

  test( 'Bump.Merge.DbvtAabbMm3', function() {
    strictEqual( typeof Bump.Merge, 'object', 'Bump.Merge exists' );
    strictEqual( typeof Bump.Merge.DbvtAabbMm3, 'function', 'Bump.Merge.DbvtAabbMm3 exists' );

    var box1 = make( 0, -5, -2, 1, 10, 25 ),
        box2 = make( -1, -3, -3, 12, 12, 12 ),
        res = Bump.DbvtAabbMm.create(),
        expected = make( -1, -5, -3, 12, 12, 25 );

    Bump.Merge.DbvtAabbMm3( box1, box2, res );
    deepEqual( res, expected, 'correct result' );

  } );

  test( 'Bump.NotEqual.DbvtAabbMm2', function() {
    strictEqual( typeof Bump.NotEqual, 'object', 'Bump.NotEqual exists' );
    strictEqual( typeof Bump.NotEqual.DbvtAabbMm2, 'function', 'Bump.NotEqual.DbvtAabbMm2 exists' );

    var box1 = make( 0, -5, -2, 1, 10, 25 ),
        box2 = make( -1, -3, -3, 12, 12, 12 ),
        box3 = make( 0, -5, -2, 1, 10, 25 );

    var func = Bump.NotEqual.DbvtAabbMm2;
    ok( func( box1, box2 ), 'correct result' );
    ok( !func( box1, box3 ), 'correct result' );

  } );

} )();

module( 'Bump.DbvtVolume' );

test( 'DbvtVolume "typecast" from DbvtAabbMm', function() {
  strictEqual( typeof Bump.DbvtVolume.create, 'function', 'Bump.DbvtVolume exists' );
  strictEqual( Bump.DbvtVolume, Bump.DbvtAabbMm, 'DbvtVolume and DbvtAabbMm refer to same object' );
} );

test( 'DbvtVolume shares same associated functions', function() {
  strictEqual( Bump.Intersect.DbvtVolume2, Bump.Intersect.DbvtAabbMm2, 'Intersect' );
  strictEqual( Bump.Intersect.DbvtVolume.Vector3, Bump.Intersect.DbvtAabbMm.Vector3, 'Intersect' )
  strictEqual( Bump.Proximity.DbvtVolume2, Bump.Proximity.DbvtAabbMm2, 'Proximity' );
  strictEqual( Bump.Select.DbvtVolume3, Bump.Select.DbvtAabbMm3, 'Select' );
  strictEqual( Bump.Merge.DbvtVolume3, Bump.Merge.DbvtAabbMm3, 'Merge' );
  strictEqual( Bump.NotEqual.DbvtVolume2, Bump.NotEqual.DbvtAabbMm2, 'NotEqual' );
} );

module( 'Bump.DbvtNode' );

test( 'Bump.DbvtNode exists', function() {
  var dbvtnode = Bump.DbvtNode || {};
  strictEqual( typeof dbvtnode.create, 'function', 'Bump.DbvtNode exists' );
} );

test( 'Bump.DbvtNode creation', function() {
  var t = Bump.DbvtNode.create() || {};
  ok( t instanceof Bump.DbvtNode.prototype.init, 'creation without `new` operator' );
  deepEqual( t.volume, Bump.DbvtVolume.create(), 'volume initialized correctly' );
  strictEqual( t.parent, 0, 'parent initialized correctly' );
  deepEqual( t._unionValue, [ 0, 0 ], 'internal _unionValue initialized correctly' );
} );

module( 'Bump.DbvtNode properties' );

test( 'union properties', function() {
  var node = Bump.DbvtNode.create(),
      child1 = Bump.DbvtNode.create(),
      child2 = Bump.DbvtNode.create(),
      child3 = Bump.DbvtNode.create();

  strictEqual( typeof node.childs, 'object', 'childs exists' );
  strictEqual( typeof node.data, 'number', 'data exists' );
  strictEqual( typeof node.dataAsInt, 'number', 'dataAsInt exists' );

  deepEqual( node.childs, [ 0, 0 ], 'node.childs initialized correctly' );
  equal( node.data, 0, 'node.data initialized correctly' );
  equal( node.dataAsInt, 0, 'node.dataAsInt initialized correctly' );

  // assign to childs
  node.childs = [ child2, 0 ];
  deepEqual( node.childs, [ child2, 0 ], 'array assignment to node.childs works correctly' );
  deepEqual( node._unionValue, node.childs, 'node.childs matches internal union value' );
  deepEqual( node._unionValue[ 0 ], node.data, 'node.data matches internal union value [0]' );
  deepEqual( node._unionValue[ 0 ], node.dataAsInt, 'node.dataAsInt matches internal union value [0]' );
  node.childs[ 0 ] = child1;
  node.childs[ 1 ] = child2;
  deepEqual( node.childs, [ child1, child2 ], 'index assignment works correctly' );
  deepEqual( node._unionValue, node.childs, 'node.childs matches internal union value' );
  deepEqual( node._unionValue[ 0 ], node.data, 'node.data matches internal union value [0]' );
  deepEqual( node._unionValue[ 0 ], node.dataAsInt, 'node.dataAsInt matches internal union value [0]' );

  // assign to data
  node.data = child3;
  deepEqual( node.data, child3, 'assignment to data works correctly' );
  deepEqual( node._unionValue, [child3, child2], 'union value set correctly' );
  deepEqual( node._unionValue, node.childs, 'node.childs matches internal union value' );
  deepEqual( node._unionValue[ 0 ], node.dataAsInt, 'node.dataAsInt matches internal union value [0]' );

  // assign to dataAsInt
  node.dataAsInt = 42;
  deepEqual( node.dataAsInt, 42, 'assignment to data works correctly' );
  deepEqual( node._unionValue, [ 42, child2 ], 'union value set correctly' );
  deepEqual( node._unionValue, node.childs, 'node.childs matches internal union value' );
  deepEqual( node._unionValue[ 0 ], node.data, 'node.data matches internal union value [0]' );
} );

module( 'Bump.DbvtNode member functions' );

test( 'isleaf', function() {
  var leaf1 = Bump.DbvtNode.create(),
      leaf2 = Bump.DbvtNode.create(),
      parent = Bump.DbvtNode.create();

  parent.childs = [ leaf1, leaf2 ];

  strictEqual( typeof leaf1.isleaf, 'function', 'isleaf exists' );
  ok( leaf1.isleaf(), 'leaf node returns true' );
  ok( leaf2.isleaf(), 'leaf node returns true' );
  ok( !parent.isleaf(), 'internal node returns false' );

} );


test( 'isinternal', function() {
  var leaf1 = Bump.DbvtNode.create(),
      leaf2 = Bump.DbvtNode.create(),
      parent = Bump.DbvtNode.create();

  parent.childs = [ leaf1, leaf2 ];

  strictEqual( typeof leaf1.isinternal, 'function', 'isinternal exists' );
  ok( !leaf1.isinternal(), 'leaf node returns false' );
  ok( !leaf2.isinternal(), 'leaf node returns false' );
  ok( parent.isinternal(), 'internal node returns true' );

} );

module( 'Bump.Dbvt' );

test( 'Bump.Dbvt exists', function() {
  var dbvt = Bump.Dbvt || {};
  strictEqual( typeof dbvt.create, 'function', 'Bump.Dbvt exists' );
} );

test( 'Bump.Dbvt creation', function() {
  var t = Bump.Dbvt.create() || {};
  ok( t instanceof Bump.Dbvt.prototype.init, 'creation without `new` operator' );
  equal( t.m_root, 0, 'm_root initialized correctly' );
  equal( t.m_free, 0, 'm_free initialized correctly' );
  equal( t.m_lkhd, -1, 'm_lkhd initialized correctly' );
  equal( t.m_leaves, 0, 'm_leaves initialized correctly' );
  equal( t.m_opath, 0, 'm_opath initialized correctly' );
  deepEqual( t.m_stkStack, [], 'm_opath initialized correctly' );
} );

module( 'Dbvt.clear' );
test('test skipped', function() {});

module( 'Dbvt.empty' );
test('test skipped', function() {});

module( 'Dbvt.optimizeBottomUp' );
test('test skipped', function() {});

module( 'Dbvt.optimizeTopDown' );
test('test skipped', function() {});

module( 'Dbvt.optimizeIncremental' );
test('test skipped', function() {});

module( 'Dbvt.insert' );
test('test skipped', function() {});

module( 'Dbvt.updateLeafLookahead' );
test('test skipped', function() {});

module( 'Dbvt.updateLeafVolume' );
test('test skipped', function() {});

module( 'Dbvt.updateLeafVolumeVelocityMargin' );
test('test skipped', function() {});

module( 'Dbvt.updateLeafVolumeVelocity' );
test('test skipped', function() {});

module( 'Dbvt.updateLeafVolumeMargin' );
test('test skipped', function() {});

module( 'Dbvt.remove' );
test('test skipped', function() {});

module( 'Dbvt.write' );
test('test skipped', function() {});

module( 'Dbvt.clone' );
test('test skipped', function() {});

module( 'Dbvt.collideTT' );
test('test skipped', function() {});

module( 'Dbvt.collideTTpersistenStack' );
test('test skipped', function() {});

module( 'Dbvt.collideTV' );
test('test skipped', function() {});

module( 'Dbvt.rayTestInternal' );
test('test skipped', function() {});

module( 'Dbvt.maxdepth' );
test('test skipped', function() {});

module( 'Dbvt.countLeaves' );
test('test skipped', function() {});

module( 'Dbvt.extractLeaves' );
test('test skipped', function() {});

module( 'Dbvt.benchmark' );
test('test skipped', function() {});

module( 'Dbvt.enumNodes' );
test('test skipped', function() {});

module( 'Dbvt.enumLeaves' );
test('test skipped', function() {});

module( 'Dbvt.rayTest' );
test('test skipped', function() {});

module( 'Dbvt.collideKDOP' );
test('test skipped', function() {});

module( 'Dbvt.collideOCL' );
test('test skipped', function() {});

module( 'Dbvt.collideTU' );
test('test skipped', function() {});

module( 'Dbvt.allocate' );
test('test skipped', function() {});

module( 'Bump.Dbvt.sStkNN' );

test( 'Bump.Dbvt.sStkNN exists', function() {
  var s = Bump.Dbvt.sStkNN || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.sStkNN exists' );
} );

test( 'Bump.Dbvt.sStkNN creation', function() {
  var t = Bump.Dbvt.sStkNN.create() || {},
      na = Bump.DbvtNode.create(),
      nb = Bump.DbvtNode.create(),
      t2 = Bump.Dbvt.sStkNN.create( na, nb );
  ok( t instanceof Bump.Dbvt.sStkNN.prototype.init, 'creation without `new` operator' );
  ok( t2 instanceof Bump.Dbvt.sStkNN.prototype.init, 'creation without `new` operator' );
  equal( t.a, 0, 'a initialized correctly to default' );
  equal( t.b, 0, 'b initialized correctly to default' );
  strictEqual( t2.a, na, 'a initialized correctly' );
  strictEqual( t2.b, nb, 'b initialized correctly' );
} );

module( 'Bump.Dbvt.sStkNP' );

test( 'Bump.Dbvt.sStkNP exists', function() {
  var s = Bump.Dbvt.sStkNP || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.sStkNP exists' );
} );

test( 'Bump.Dbvt.sStkNP creation', function() {
  var t = Bump.Dbvt.sStkNP.create() || {},
      n = Bump.DbvtNode.create(),
      t2 = Bump.Dbvt.sStkNP.create( n, 4 );
  ok( t instanceof Bump.Dbvt.sStkNP.prototype.init, 'creation without `new` operator' );
  ok( t2 instanceof Bump.Dbvt.sStkNP.prototype.init, 'creation without `new` operator' );
  equal( t.node, 0, 'node initialized correctly to default' );
  equal( t.mask, 0, 'mask initialized correctly to default' );
  strictEqual( t2.node, n, 'node initialized correctly' );
  equal( t2.mask, 4, 'mask initialized correctly' );
} );

module( 'Bump.Dbvt.sStkNPS' );

test( 'Bump.Dbvt.sStkNPS exists', function() {
  var s = Bump.Dbvt.sStkNPS || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.sStkNPS exists' );
} );

test( 'Bump.Dbvt.sStkNPS creation', function() {
  var t = Bump.Dbvt.sStkNPS.create() || {},
      n = Bump.DbvtNode.create(),
      t2 = Bump.Dbvt.sStkNPS.create( n, 4, 1337 );
  ok( t instanceof Bump.Dbvt.sStkNPS.prototype.init, 'creation without `new` operator' );
  ok( t2 instanceof Bump.Dbvt.sStkNPS.prototype.init, 'creation without `new` operator' );
  equal( t.node, 0, 'node initialized correctly to default' );
  equal( t.mask, 0, 'mask initialized correctly to default' );
  equal( t.value, 0, 'value initialized correctly to default' );
  strictEqual( t2.node, n, 'node initialized correctly' );
  equal( t2.mask, 4, 'mask initialized correctly' );
  equal( t2.value, 1337, 'value initialized correctly' );
} );

module( 'Bump.Dbvt.sStkCLN' );

test( 'Bump.Dbvt.sStkCLN exists', function() {
  var s = Bump.Dbvt.sStkCLN || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.sStkCLN exists' );
} );

test( 'Bump.Dbvt.sStkCLN creation', function() {
  var t = Bump.Dbvt.sStkCLN.create() || {},
      n = Bump.DbvtNode.create(),
      p = Bump.DbvtNode.create(),
      t2 = Bump.Dbvt.sStkCLN.create( n, p );
  ok( t instanceof Bump.Dbvt.sStkCLN.prototype.init, 'creation without `new` operator' );
  ok( t2 instanceof Bump.Dbvt.sStkCLN.prototype.init, 'creation without `new` operator' );
  equal( t.node, 0, 'node initialized correctly to default' );
  equal( t.parent, 0, 'parent initialized correctly to default' );
  strictEqual( t2.node, n, 'node initialized correctly' );
  equal( t2.parent, p, 'parent initialized correctly' );
} );

module( 'Bump.Dbvt.ICollide' );

test( 'Bump.Dbvt.ICollide exists', function() {
  var s = Bump.Dbvt.ICollide || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.ICollide exists' );
} );

test( 'Bump.Dbvt.ICollide creation', function() {
  var t = Bump.Dbvt.ICollide.create();
  ok( t instanceof Bump.Dbvt.ICollide.prototype.init, 'creation without `new` operator' );
  strictEqual( typeof t.ProcessNode2, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.ProcessNode, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.ProcessNodeScalar, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.Descent, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.AllLeaves, 'function', 'ProcessNode exists' );
} );

module( 'Bump.Dbvt.IWriter' );

test( 'Bump.Dbvt.IWriter exists', function() {
  var s = Bump.Dbvt.IWriter || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.IWriter exists' );
} );

test( 'Bump.Dbvt.IWriter creation', function() {
  var t = Bump.Dbvt.IWriter.create();
  ok( t instanceof Bump.Dbvt.IWriter.prototype.init, 'creation without `new` operator' );
  strictEqual( typeof t.Prepare, 'function', 'Prepare exists' );
  strictEqual( typeof t.WriteNode, 'function', 'WriteNode exists' );
  strictEqual( typeof t.WriteLeaf, 'function', 'WriteLeaf exists' );
} );

module( 'Bump.Dbvt.IClone' );

test( 'Bump.Dbvt.IClone exists', function() {
  var s = Bump.Dbvt.IClone || {};
  strictEqual( typeof s.create, 'function', 'Bump.Dbvt.IClone exists' );
} );

test( 'Bump.Dbvt.IClone creation', function() {
  var t = Bump.Dbvt.IClone.create();
  ok( t instanceof Bump.Dbvt.IClone.prototype.init, 'creation without `new` operator' );
  strictEqual( typeof t.CloneLeaf, 'function', 'CloneLeaf exists' );
} );

module( 'Bump.DbvtNodeEnumerator' );

test( 'Bump.DbvtNodeEnumerator exists', function() {
  var s = Bump.DbvtNodeEnumerator || {};
  strictEqual( typeof s.create, 'function', 'Bump.DbvtNodeEnumerator exists' );
} );

test( 'Bump.DbvtNodeEnumerator creation', function() {
  var t = Bump.DbvtNodeEnumerator.create();
  ok( t instanceof Bump.DbvtNodeEnumerator.prototype.init, 'creation without `new` operator' );

  deepEqual( t.nodes, [], 'nodes initialized correctly' );
  strictEqual( typeof t.ProcessNode2, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.ProcessNode, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.ProcessNodeScalar, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.Descent, 'function', 'ProcessNode exists' );
  strictEqual( typeof t.AllLeaves, 'function', 'ProcessNode exists' );
} );

test( 'Bump.DbvtNodeEnumerator Process member function', function() {
  var t = Bump.DbvtNodeEnumerator.create(),
  n0 = Bump.DbvtNode.create(),
  n1 = Bump.DbvtNode.create(),
  n2 = Bump.DbvtNode.create();

  n0.childs = [ n1, n2 ];
  n1.parent = n0;
  n2.parent = n0;

  t.Process( n0 );
  t.Process( n1 );
  t.Process( n2 );

  deepEqual( t.nodes, [ n0, n1, n2 ], 'Process function correctly adds to nodes' );

} );