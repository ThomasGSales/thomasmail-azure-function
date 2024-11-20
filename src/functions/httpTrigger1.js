const { app } = require('@azure/functions');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env["SENDGRID_API_KEY"]);

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

    try {
        
        const { toMail, content } = await request.json();

        const email = {
            to: toMail,
            from: 'tgmsales@minha.fag.edu.br', 
            subject: "Função de disparo de e-mail SendGrid Feito por Thomas",
            text: content
        };

        await sendgrid.send(email);

        return { 

            body: 
                
                `Email enviado para ${email.to}\n\nConteudo do email:\n${email.text}`
                
            }

        } catch (error) {
            context.log(`Erro ao enviar e-mail: ${error}`);
            return { status: 500, body: "Erro ao enviar e-mail." };
        }
    }

});
