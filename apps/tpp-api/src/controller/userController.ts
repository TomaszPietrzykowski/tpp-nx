// const User = require("../model/userModel")
// const asyncHandler = require("express-async-handler")
// const generateToken = require("../utils/generateToken")
// const { sendConfirmationEmail } = require("./emailController")

// temporary route: ****************************************************************
export const getUsers = async (req, res) => {
  res.json([
    { name: 'User1', id: '1' },
    { name: 'User1', id: '1' },
  ]);
};
// **********************************************************************************
// @description: Register new user
// // @route: POST /api/users
// // @access: Public
// exports.registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body
//   const userExist = await User.findOne({ email })
//   if (userExist) {
//     res.status(400)
//     throw new Error("User already exists")
//   }
//   const user = await User.create({
//     name,
//     email,
//     password,
//   })

//   if (user) {
//     // send confirmation email
//     sendConfirmationEmail(user.email, user.name, user._id, "register")
//     // send response with token
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error("Invalid user data")
//   }
// })

// // @description: Authenticate user & get token
// // @route: POST /api/users/login
// // @access: Public
// exports.authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body
//   const user = await User.findOne({ email })
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(401)
//     throw new Error("Invalid email or password")
//   }
// })

// // @description: Get user profile
// // @route: GET /api/users/profile
// // @access: Private
// exports.getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

// // @description: Update user profile
// // @route: PUT /api/users/profile
// // @access: Private
// exports.updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     if (req.body.password) {
//       user.password = req.body.password
//     }

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       isSuperAdmin: updatedUser.isSuperAdmin || false,
//       token: generateToken(updatedUser._id),
//     })
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

// // @description: Get all users
// // @route: GET /api/users
// // @access: Private/Admin
// exports.getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })

// // @description: Delete user
// // @route: DELETE /api/users/:id
// // @access: Private/Admin
// exports.deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)
//   if (user) {
//     if (!user.isSuperAdmin) {
//       await user.remove()
//       res.json({ message: "User deleted" })
//     } else {
//       res.status(401).json({
//         message:
//           "Superadmin settings cannot be changed from this permission tier.",
//       })
//     }
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

// // @description: Get user by ID
// // @route: GET /api/users/:id
// // @access: Private/Admin
// exports.getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password")
//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

// // @description: Update user
// // @route: PUT /api/users/:id
// // @access: Private/Admin
// exports.updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)

//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     user.isAdmin = req.body.isAdmin

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error("User not found")
//   }
// })
