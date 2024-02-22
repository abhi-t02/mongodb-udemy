// db.persons.aggregate([
//   { $match: { gender: "female" } },
//   { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
//   { $sort: { totalPersons: 1 } },
// ]);

// db.persons.aggregate([
//   { $match: { "dob.age": { $gt: 15 } } },
//   { $group: { _id: { gender: "$gender" }, avgAge: { $avg: "$dob.age" } } },
//   { $sort: { avgAge: -1 } },
// ]);

// db.persons.aggregate([
//   {
//     $project: {
//       _id: 0,
//       name: 1,
//       email: 1,
//       location: {
//         type: "Point",
//         coordinates: [
//           {
//             $convert: {
//               input: "$location.coordinates.longitude",
//               to: "double",
//               onError: 0,
//               onNull: 0.0,
//             },
//           },
//           {
//             $convert: {
//               input: "$location.coordinates.latitude",
//               to: "double",
//               onError: 0,
//               onNull: 0.0,
//             },
//           },
//         ],
//       },
//       birthDate: { $toDate: "$dob.date" },
//       age: "$dob.age",
//     },
//   },
//   {
//     $project: {
//       email: 1,
//       location: 1,
//       gender: 1,
//       birthDate: 1,
//       age: 1,
//       fullName: { $concat: ["$name.first", " ", "$name.last"] },
//     },
//   },
//   {
//     $out: "test",
//   },
// ]);

// geonear
// db.test.aggregate([
//   {
//     $geoNear: {
//       near: {
//         type: "Point",
//         coordinates: [78.0207, -84.1572],
//       },
//       maxDistance: 10000,
//       distanceField: "distance",
//     },
//   },
// ]);

// unwind
// addToSet
// db.friends.aggregate([
//   {
//     $unwind: "$hobbies",
//   },
//   {
//     $group: {
//       _id: { age: "$age" },
//       allHobbies: { $addToSet: "$hobbies" },
//     },
//   },
// ]);

// db.friends.aggregate([
//   {
//     $project: {
//       _id: 0,
//       examScore: {
//         $slice: ["$examScores", 1],
//       },
//       numScores: { $size: "$examScores" },
//     },
//   },
// ]);

// db.friends.aggregate([
//   {
//     $project: {
//       _id: 0,
//       scores: {
//         $filter: {
//           input: "$examScores",
//           as: "sc",
//           cond: {
//             $gt: ["$$sc.score", 60],
//           },
//         },
//       },
//     },
//   },
// ]);

// db.friends.aggregate([
//   {
//     $unwind: "$examScores",
//   },
//   {
//     $group: {
//       _id: { name: "$name" },
//       scores: { $max: "$examScores.score" },
//     },
//   },
//   {
//     $sort: {
//       scores: -1,
//     },
//   },
// ]);

// db.persons.aggregate([
//   {
//     $bucket: {
//       groupBy: "$dob.age",
//       boundaries: [0, 18, 30, 50, 80],
//       output: {
//         numPersons: { $sum: 1 },
//         avgAge: { $avg: "$dob.age" },
//         names: {
//           $push: "$name.first",
//         },
//       },
//     },
//   },
// ]);

// db.persons.aggregate([
//   {
//     $bucketAuto: {
//       groupBy: "$dob.age",
//       buckets: 5,
//       output: {
//         numPersons: { $sum: 1 },
//         avgAge: { $avg: "$dob.age" },
//       },
//     },
//   },
// ]);

// db.persons.aggregate([
//   {
//     $project: {
//       _id: 0,
//       name: "$name.first",
//       birtDate: { $toDate: "$dob.date" },
//     },
//   },
//   {
//     $skip: 10,
//   },
//   {
//     $limit: 10,
//   },
// ]);
