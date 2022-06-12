module.exports = async (consultaBd,res)=>{
    try {
        const resultElements = await consultaBd();
        res.status(200).json(resultElements)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}