const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const Chat=require('./models/Chats.js')
const User=require('./models/User.js')

mongoose.connect('mongodb://127.0.0.1:27017/dres', {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true
})
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Connection unable to open")
})

mongoose.set('strictQuery', true);

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.get('/route1', (req, res)=>{
    res.render('homepg.ejs');
})

app.get('/route2', async (req, res)=>{
    const documents=await User.find({});
    res.render('leaderboard.ejs', {documents});
})

app.get('/route1.5', async (req, res)=>{
    const id=Math.floor(Math.random()*5)+1;
    const doc=await User.find({id_no:id});
    const others=await User.find({id_no:{$ne:id}});
    console.log(doc);
    console.log(others);
    res.render('rating.ejs', {id, doc, others});
})

app.post('/route_back', async (req, res)=>{
    var avg=0, rat=0;
    var x=0;
    if('f1name' in req.body)
    {
        avg=avg+Number(req.body.f1name);

    }
    else x=1;
    if('f2name' in req.body)
    {
        
        avg=avg+Number(req.body.f2name);

    } else x=2;
    if('f3name' in req.body)
    {
        avg=avg+Number(req.body.f3name);

    } else x=3;
    if('f4name' in req.body)
    {
        avg=avg+Number(req.body.f4name);

    } else x=4;
    if('f5name' in req.body)
    {
        avg=avg+Number(req.body.f5name);

    } else x=5;

    avg=(avg/4);

    if('f1name' in req.body)
    {
        rat=10-0.1*Math.abs(avg-Number(req.body.f1name));
        const pc=await User.find({id_no:1});
        
        pc[0].rating10=(pc[0].rating10*pc[0].x10+rat)/(pc[0].x10+1);
        pc[0].x10+=1;

        const score=await User.updateOne({id_no:1}, {rating10:pc[0].rating10, x10:pc[0].x10});
    }
    if('f2name' in req.body)
    {
        
        rat=10-0.1*Math.abs(avg-Number(req.body.f2name));
        const pc=await User.find({id_no:2});
        pc[0].rating10=(pc[0].rating10*pc[0].x10+rat)/(pc[0].x10+1);
        pc[0].x10+=1;

        const score=await User.updateOne({id_no:2}, {rating10:pc[0].rating10, x10:pc[0].x10});

    } 
    if('f3name' in req.body)
    {
        rat=10-0.1*Math.abs(avg-Number(req.body.f3name));
        const pc=await User.find({id_no:3});
        pc[0].rating10=(pc[0].rating10*pc[0].x10+rat)/(pc[0].x10+1);
        pc[0].x10+=1;
        const score=await User.updateOne({id_no:3}, {rating10:pc[0].rating10, x10:pc[0].x10});

    }
    if('f4name' in req.body)
    {
        rat=10-0.1*Math.abs(avg-Number(req.body.f4name));
        const pc=await User.find({id_no:4});
        pc[0].rating10=(pc[0].rating10*pc[0].x10+rat)/(pc[0].x10+1);
        pc[0].x10+=1;
        
        core=await User.updateOne({id_no:4}, {rating10:pc[0].rating10, x10:pc[0].x10});

    }
    if('f5name' in req.body)
    {
        rat=10-0.1*Math.abs(avg-Number(req.body.f5name));
        const pc=await User.find({id_no:5});
        pc[0].rating10=(pc[0].rating10*pc[0].x10+rat)/(pc[0].x10+1);
        pc[0].x10+=1;
        const score=await User.updateOne({id_no:5}, {rating10:pc[0].rating10, x10:pc[0].x10});

    }

    avg*=0.9;
    const sc=await User.find({id_no:x});
    sc[0].rating90=(sc[0].rating90*sc[0].x90+avg)/(sc[0].x90+1);
    sc[0].x90+=1;

  
    console.log(sc[0].rating90);
    const score=await User.updateOne({id_no:x}, {rating90:sc[0].rating90, x90:sc[0].x90});
    res.redirect('/route2')

})


app.listen(3002, ()=>{
    console.log('Serving on port 3002')
})