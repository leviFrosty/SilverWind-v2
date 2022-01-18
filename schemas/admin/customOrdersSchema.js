import Joi from "joi";

const descriptionSchema = Joi.string().trim().required
const imageSchema = Joi.string().dataUri().required,
const idSchema = Joi.string().uuid().required
const bandsSchema = Joi.array().items({
  id: idSchema,
  image: imageSchema,
  description: descriptionSchema,
})

const stonesSchema = Joi.array().items(
  Joi.object({
    id: idSchema,
    image: imageSchema,
    description: descriptionSchema,
    quantity: Joi.number().integer().positive().required,
    size: Joi.string().alphanum().required
  })
)
const stoneSettingsSchema = Joi.array().items(
  Joi.object({
    id: idSchema,
    image: imageSchema,
    description: descriptionSchema,
  })
)
const backExposedSchema = Joi.boolean().required
const categoriesSchema = Joi.array().items(
  Joi.object({
    name: descriptionSchema,
    options: Joi.object({
      lengths: Joi.array(),
      bands: bandsSchema,
      earringType: Joi.array().items({
        name: descriptionSchema,
        image: imageSchema,
        id: idSchema,
      })
    })
  })
)


export default Joi.object({
  stones: stonesSchema,
  stoneSettings: stoneSettingsSchema,
  backExposed: backExposedSchema,
  categories: categoriesSchema,
});


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