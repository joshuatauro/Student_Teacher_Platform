const router = require("express").Router()
const db = require("../dbConfig")

router.post("/add", async(req, res) => {
  const {name, address, courses, brochureURL, desc, rank, rating, logoURL, bannerURL, highestPKG, medianPKg, averagePKG, clgURL, emailIdentifier} = req.body

  try{
    const addCollegeQuery = await db.query('INSERT INTO college(clg_name, clg_desc, courses, clg_url, brochure_url, rank, rating, logo_url, banner_url, highest_pkg, avg_pkg, median_pkg, clg_address, email_identifier) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id', [name, desc, courses, clgURL, brochureURL, rank, [rating], logoURL, bannerURL, highestPKG,averagePKG, medianPKg, address, emailIdentifier])
    res.status(200).json({
      message: "Successfully added your college",
      collegeID: addCollegeQuery.rows[0],
      code: 1
    })
  }catch(err) {
    console.log(err.message)
  }
})

router.get("/:collegeID", async(req, res) => {
  const collegeID = req.params.collegeID

  try{
    const getCollegeDetails = await db.query("SELECT clg_name, clg_desc, courses, clg_url, brochure_url, rank, rating, logo_url, img_urls, banner_url, highest_pkg, median_pkg, avg_pkg, primary_phone, secondary_phone, scholarship_desc FROM college WHERE id = $1", [collegeID])

    res.status(200).json({
      details: getCollegeDetails.rows[0]
    })

  }catch(err) {
    console.log(err)
  }
})

module.exports = router