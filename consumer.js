const amqp = require("amqplib");
const queueName = process.argv[2] || "jobsQueue";

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    //Mesajın Alınması...
    console.log("Mesaj Bekleniyor");
    channel.consume(queueName, (message) => {
      console.log("Message", message.content.toString());
      //Message is read
      channel.ack(message);
    });
  } catch (error) {
    console.log("Error", error);
  }
}
