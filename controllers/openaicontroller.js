const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, resp) => {
    const {prompt,size} = req.body;
    const imagesize = size ==='small' ? "256x256" : size ==='medium' ? "512x512" :"1024x1024"
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size:"512x512",
    });
    const imageurl = response.data.data[0].url;

    resp.status(200).json({
      success: true,
      data: imageurl,
    });
    console.log(imageurl)
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    resp.status(400).json({
      success: false,
      error: "the image couldnot be generated",
    });
  }
};

module.exports = { generateImage };
