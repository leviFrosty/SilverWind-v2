import Joi from "joi";

export const descriptionSchema = Joi.string().trim().required();
export const imageSchema = Joi.string().dataUri().required();
export const idSchema = Joi.string().required();

export const stoneSchema = Joi.object({
  description: descriptionSchema,
  dimensions: Joi.string().alphanum().required(),
  id: idSchema,
  image: imageSchema,
  quantity: Joi.number().integer().positive().required(),
});

// const bandsSchema = Joi.array().items({
//   id: idSchema,
//   image: imageSchema,
//   description: descriptionSchema,
// });

// export const backExposedSchema = Joi.boolean().required();
// export const categoriesSchema = Joi.array().items(
//   Joi.object({
//     name: descriptionSchema,
//     options: Joi.object({
//       lengths: Joi.array(),
//       bands: bandsSchema,
//       earringType: Joi.array().items({
//         name: descriptionSchema,
//         image: imageSchema,
//         id: idSchema,
//       }),
//     }),
//   })
// );

// export default Joi.object({
//   stones: stoneSchema,
//   stoneSettings: stoneSettingsSchema,
//   backExposed: backExposedSchema,
//   categories: categoriesSchema,
// });

// const exampleOutput = {
//   // General Options
//   stones: [
//     {
//       id: "someid1231252341",
//       image: "https://someimgurl/",
//       description: "Stone name",
//       quantity: 10,
//       size: "1x3",
//     },
//   ],
//   stoneSettings: [
//     {
//       id: "someid1231252341",
//       image: "https://someimgurl/",
//       description: "Stone name",
//     },
//   ],
//   back_exposed: Boolean,
//   // Category Specific
//   categories: [
//     {
//       name: "necklaces",
//       options: {
//         lengths: [8, 10, 12, 14, 16],
//       },
//     },
//     ,
//     {
//       name: "rings",
//       options: {
//         bands: [
//           {
//             id: "someid1231252341",
//             image: "https://someimgurl/",
//             description: "Stone name",
//           },
//         ],
//       },
//     },
//     {
//       name: "earrings",
//       options: {
//         earringType: [
//           { name: "stud", image: "https://someimgurl/", id: "someid" },
//           { name: "dangly", image: "https://someimgurl/", id: "someid" },
//         ],
//       },
//     },
//   ],
// };
