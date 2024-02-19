import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const randomNumber = Math.random();
    if (randomNumber < 0.8) {
      return res.status(200).json({ message: 'Purchase successful!' });
    }

    return res.status(400).json({ message: 'Purchase failed!' });
  }

  return res.status(405).json({ message: 'Method not allowed!' });
};

export default handler;
