const mongoose = require("mongoose");

exports.auth = async (req, res, next) => {
  res.status(200).json({ message: "Working route" });
  //     const { provider, accessToken } = req.body;

  //   try {
  //     let userInfo = await getUserDetailsFromOAuth(provider, accessToken);

  //     const userWithEmail = await User.findOne({ email: userInfo.email });
  //     if (userWithEmail) {
  //       const userId = userWithEmail._id;

  //       for (let el of userWithEmail.providers) {
  //         if (el.name === provider && el.id === userInfo.id) {
  //           const token = await signJwt(userWithEmail);

  //           return res.status(200).json({
  //             success: true,
  //             message: "Logged in successfully",
  //             token,
  //           });
  //         }
  //       }

  //       await User.updateOne(
  //         { _id: userId },
  //         { $push: { providers: { name: provider, id: userInfo.id } } }
  //       );

  //       const token = await signJwt(userWithEmail);

  //       return res.status(200).json({
  //         success: true,
  //         message: "Logged in successfully",
  //         token,
  //       });
  //     }

  //     const userWithSocialId = await User.findOne({
  //       providers: { name: provider, id: userInfo.id },
  //     });

  //     if (userWithSocialId) {
  //       const userId = userWithSocialId.userId;

  //       await User.updateOne(
  //         { _id: userId },
  //         { $set: { email: userInfo.email } }
  //       );

  //       const token = await signJwt(userWithEmail);

  //       return res.status(200).json({
  //         success: true,
  //         message: "Logged in successfully",
  //         token,
  //       });
  //     }

  //     const displayId = generateDisplayId("U");

  //     // Signup
  //     // Download avatar from OAuth provider and upload it on S3
  //     const userName = `${userInfo.firstName}${userInfo.lastName}`;
  //     const oauthAvatarLink = userInfo.avatar;
  //     const avatar = await getUserAvatarFromOAuth(
  //       provider,
  //       userName,
  //       oauthAvatarLink
  //     );

  //     const newUser = new User({
  //       _id: new mongoose.Types.ObjectId(),
  //       firstName: userInfo.firstName,
  //       lastName: userInfo.lastName,
  //       displayId,
  //       email: userInfo.email,
  //       avatar,
  //       providers: [{ name: provider, id: userInfo.id }],
  //     });

  //     await newUser.save();

  //     const token = await signJwt(newUser);

  //     return res.status(200).json({
  //       success: true,
  //       message: "Logged in successfully",
  //       token,
  //     });
  //   } catch (err) {
  //     console.log(err.toString());
  //     next(err);
  //   }
};
