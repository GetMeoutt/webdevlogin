


const fakedb=[]



const findOrCreate = (profile)=>{

    let user = fakedb.find((user)=> user.githubId === profile.id)

    if (!user){
        user={
            githubId : profile.id,
            username : profile.username,
            picture: profile.picture
        }
        fakedb.push(user)
        console.log(fakedb)

    }
    console.log(fakedb)
    return user
}


module.exports = {findOrCreate}