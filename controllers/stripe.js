// // const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const uuid= require('uuid').v4;

// module.exports.payment = async(req,res)=>{
//   console.log(req.body)
//   let err,status
//   try{
//     const {product,token} = req.body;
//     const customer = await stripe.customers.create({
//       email:token.email,
//       source:token.id
//     })
//     const key = uuid()
//     const charge = await stripe.charges.create({
//       amount : product.price*100,
//       currency : "usd",
//       customer:customer.id,
//       receipt_email : token.email,
//       description : "Purchase ",
//       shipping : {
//         name : token.card.name,
//         address :{
//           line1:token.card.address_line1,
//           line2:token.card.address_line2,
//           city:token.card.address_city,
//           country:token.card.address_country,
//           postal_code:token.card.address_zip,
//         }
//       }
//     },
//     {
//       key,
//     }
//     )
//     console.log("Charge : ",{charge});
//     status="Success";
//     res.status(200).json(status)
//   }
//   catch(error){
//     console.log(error)
//     status="Failure";
//     res.status(400).json({status});
//   }
// };

const stripe = require('stripe')(process.env.STRIPE_KEY)

module.exports.processPayment = async(req,res)=>{
  stripe.paymentIntents.create({
    amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
  },(stripeErr,stripeRes)=>{
    if(stripeErr){
      console.log(stripeErr)
      res.status(500).json(stripeErr);
    }
    else{
      res.status(200).json(stripeRes);
    }
  }
  )
}