import { NextApiRequest, NextApiResponse } from 'next';

export default async function huggAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/openchat/openchat_3.5',
        {
          headers: { Authorization: 'Bearer DEIN_API_SCHLÜSSEL', 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(req.body),
        }
      );
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Ein unbekannter Fehler ist aufgetreten.' });
      }
    }  // Stelle sicher, dass diese Klammer hier ist
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Methode ${req.method} Nicht Erlaubt`);
  }  // Stelle sicher, dass diese Klammer hier ist
}
