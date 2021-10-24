const mongoose = require("mongoose");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("./userModel");

exports.auth = async (req, res, next) => {
  //   res.status(200).json({ message: "Working route" });
  const { accessToken } = req.params;
  const provider = "Google";
  try {
    let userInfo = await getUserDetailsFromOAuth(provider, accessToken);

    const userWithEmail = await User.findOne({ email: userInfo.email });
    if (userWithEmail) {
      const userId = userWithEmail._id;

      for (let el of userWithEmail.providers) {
        if (el.name === provider && el.id === userInfo.id) {
          const token = await signJwt(userWithEmail);

          return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
          });
        }
      }

      await User.updateOne(
        { _id: userId },
        { $push: { providers: { name: provider, id: userInfo.id } } }
      );

      const token = await signJwt(userWithEmail);

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
      });
    }

    // const userWithSocialId = await User.findOne({
    //   providers: { name: provider, id: userInfo.id },
    // });

    // if (userWithSocialId) {
    //   const userId = userWithSocialId.userId;

    //   await User.updateOne(
    //     { _id: userId },
    //     { $set: { email: userInfo.email } }
    //   );

    //   const token = await signJwt(userWithEmail);

    //   return res.status(200).json({
    //     success: true,
    //     message: "Logged in successfully",
    //     token,
    //   });
    // }

    // Signup
    // Download avatar from OAuth provider and upload it on S3
    // const userName = `${userInfo.firstName}${userInfo.lastName}`;
    // const avatar = userInfo.avatar;
    // const avatar = await getUserAvatarFromOAuth(
    //   provider,
    //   userName,
    //   oauthAvatarLink
    // );

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      avatar: userInfo.avatar,
      providers: [{ name: provider, id: userInfo.id }],
    });

    await newUser.save();

    const token = await signJwt(newUser);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    console.log(err.toString());
    next(err);
  }
};

const getUserDetailsFromOAuth = async (provider, accessToken) => {
  let userInfo = {};

  if (provider === "Google") {
    // Get user data from Google API
    console.log(accessToken);
    const { data } = await axios({
      method: "get",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // http://533123786044-jlqk14j8qf1kt62fbch6rp5vfbsut5fe.apps.googleusercontent.com/
    console.log(data);
    // Increase size of profile picture obtained
    // const googleProfilePic = data.picture.replace("s96", "s500");

    // Store profile picture temporarily
    // const response = await axios.get(encodeURI(googleProfilePic), {
    //   responseType: "arraybuffer",
    // });

    // Upload profile picture to S3
    // let s3BaseUrl = S3_BASE_URL;
    // let avatarKey = uploadUserAvatar(data.given_name, response.data);

    // Create userInfo object and return it
    userInfo.provider = "Google";
    userInfo.id = data.sub;
    userInfo.firstName = data.given_name;
    userInfo.lastName = data.family_name;
    userInfo.email = data.email;
    userInfo.avatar = data.picture;

    return userInfo;
  } else if (provider === "Facebook") {
    // Get user data from Facebook SDK
    const fbUser = await FB.api("me", {
      fields: ["id", "email", "first_name", "last_name", "picture.type(large)"],
      access_token: accessToken,
    });

    // Define s3 base url and default avatar key
    // let s3BaseUrl = S3_BASE_URL;
    // let avatarKey = S3_DEFAULT_AVATAR_KEY;

    // If the user has uploaded profile picture on facebook, upload that to s3 and use that link
    // if (await profilePicUploadedOnFacebook(fbUser.picture.data.url)) {
    //   const response = await axios.get(encodeURI(fbUser.picture.data.url), {
    //     responseType: "arraybuffer",
    //   });

    //   avatarKey = uploadUserAvatar(fbUser.first_name, response.data);
    // }

    // Create userInfo object and return it
    userInfo.provider = "Facebook";
    userInfo.id = fbUser.id;
    userInfo.firstName = fbUser.first_name;
    userInfo.lastName = fbUser.last_name;
    userInfo.email = fbUser.email;
    userInfo.avatar = fbUser.picture.data.url;

    return userInfo;
  }
};

const signJwt = async (user) => {
  // console.log(user);
  const token = jwt.sign(
    {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    "my-little-secret",
    { expiresIn: "35d" }
  );

  return token;
};
