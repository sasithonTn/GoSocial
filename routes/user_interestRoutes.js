const mongoose = require('mongoose');
const UserInterest = mongoose.model('user_interests');

module.exports = app => {
  app.post('/userInterest', async (req, res) => {
    try {
      const { user_id, interests, character } = req.body;

      const newUserInterest = new UserInterest({
        user_id,
        interest: interests,
        character
      });

      await newUserInterest.save();
      res.send(newUserInterest);
      console.log(newUserInterest);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get('/userInterest', async (req, res) => {
    try {
      const userInterests = await UserInterest.find().select('user_id interest');
      res.json(userInterests);
      
      console.log(userInterests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch interests' });
    }
  });

  app.get('/userInterest/:user_id', async (req, res) =>{
    try {
      const focusTime = await UserInterest.find({user_id: req.params.user_id});
      if (focusTime) {
        res.json(focusTime);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.post('/performContentBasedFiltering', async (req, res) => {
    try {
      const userInterests = await UserInterest.find().select('user_id interest');
      const targetUserId = req.body.targetUserId; // รหัสผู้ใช้ที่ต้องการเปรียบเทียบ
      const filteredResults = performContentBasedFiltering(userInterests, targetUserId);
      res.json(filteredResults);
      console.log(filteredResults);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to perform content-based filtering' });
    }
  });

  
  function performContentBasedFiltering(userInterests, targetUserId) {
    const filteredResults = userInterests.map(userInterest => {
      if (userInterest.user_id.equals(targetUserId)) {
        return null; // ข้ามการเปรียบเทียบกับตนเอง
      }
  
      const targetUser = userInterests.find(u => u.user_id.equals(targetUserId));
      if (!targetUser) {
        return null; // ข้ามกรณีไม่พบผู้ใช้ที่เปรียบเทียบ
      }
  
      const similarityScore = calculateSimilarityScore(userInterest, targetUser);
      return {
        user_id: userInterest.user_id,
        similarity_score: similarityScore
      };
    });
  
    // ลบออบเจกต์ที่เป็น null ออกจาก filteredResults
    const validResults = filteredResults.filter(result => result !== null);
  
    return validResults;
  }
  

  function calculateSimilarityScore(interest1, interest2) {
  if (interest1.user_id.equals(interest2.user_id)) {
    return 0; // ข้ามการเปรียบเทียบกับตนเอง
  }

  const interests1 = interest1.interest.split('|');
  const interests2 = interest2.interest.split('|');

  // Create a set of unique interests from both users
  const uniqueInterests = new Set([...interests1, ...interests2]);

  // Create vectors for both users
  const vector1 = [];
  const vector2 = [];
  for (const interest of uniqueInterests) {
    vector1.push(interests1.includes(interest) ? 1 : 0);
    vector2.push(interests2.includes(interest) ? 1 : 0);
  }

  // Calculate cosine similarity
  const similarityScore = cosineSimilarity(vector1, vector2);
  return similarityScore;
}


  function cosineSimilarity(vector1, vector2) {
    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }

    // Calculate magnitude of vectors
    let magnitude1 = 0;
    let magnitude2 = 0;
    for (let i = 0; i < vector1.length; i++) {
      magnitude1 += vector1[i] * vector1[i];
      magnitude2 += vector2[i] * vector2[i];
    }
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    // Calculate cosine similarity
    const similarity = dotProduct / (magnitude1 * magnitude2);
    return similarity;
  }

  
};
