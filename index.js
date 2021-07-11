const express = require('express')
const Razorpay = require('razorpay')

let app = express()

let order_id_variable

const razorpay = new Razorpay({
    key_id: 'rzp_test_5eyWjEYDY4hGq6'
    key_secret: 'TmdTsNdjTEtErYn6GnMAPMQS'
})

app.set('views','views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', ( req, res ) =>{
    //res.send('working')
    res.render('razorpay.ejs')
})

app.post('/', ( req, res ) =>{
    let options = {
        amount: 500,  
        currency: "INR",
          };

          razorpay.orders.create(options,(err,order) {
           // order_id_variable = order.id
              console.log(order);
              res.json(order)
          })
})

app.post('/is-order-complete' ,(req, res) =>{

    razorpay.payment.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
        if(paymentDocument.status== 'captured'){
            res.send('Payment successful')
        }else{
            res.redirect('/')
        }
    })



})
app.listen(5000)