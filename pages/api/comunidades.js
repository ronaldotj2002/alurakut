import { SiteClient } from 'datocms-client';

export default async function recebeRequests(request, response) {

    if(request.method === 'POST') {

        const TOKEN = 'cf16932b17527ba87e4c3f977c17e4';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: '968379',
            ...request.body,

        })
        
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
               
        return;
    }

    response.status(404).json({
        message: 'POST'
    })
}
