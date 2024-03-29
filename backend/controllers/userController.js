const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password } = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please enter all required fields')
  }

  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

const loginUser = asyncHandler(async(req, res) => {
  const {name, password} = req.body

  const user = await User.findOne({ name })

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('invalid Login Details')
  }
})

const getMe = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)
})

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })
}

module.exports ={
  registerUser,
  loginUser,
  getMe
}
