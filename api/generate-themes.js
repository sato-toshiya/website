// Vercelのサーバーレス関数として動作するNode.jsのコードです。
// より汎用的に、ブラウザから送信されたプロンプトをAIに渡す役割をします。

export default async function handler(req, res) {
  // POSTメソッド以外のリクエストは許可しない
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 1. ブラウザから送られてきたプロンプトを取得
    const { prompt } = req.body;

    // プロンプトが送られてきていない場合はエラーを返す
    if (!prompt) {
      return res.status(400).json({ error: 'プロンプトは必須です。' });
    }

    // 2. Vercelの環境変数から安全にAPIキーを取得
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set in environment variables.");
        return res.status(500).json({ error: 'サーバーの設定エラーです。' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // 3. Gemini APIに送信する設定を作成
    // プロンプトはブラウザから受け取ったものをそのまま使用します。
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        // このスキーマも必要に応じてブラウザから渡すようにすると、さらに汎用性が高まります。
        responseSchema: {
          type: "ARRAY",
          description: "自由研究のテーマのリスト",
          items: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "研究テーマのタイトル" },
              description: { type: "STRING", description: "何を観察すればよいかの具体的なヒント" }
            },
            required: ["title", "description"]
          }
        }
      }
    };

    // 4. Gemini APIにリクエストを送信
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`Gemini API error: ${apiResponse.statusText}`);
    }

    const result = await apiResponse.json();

    // 5. APIからの結果を解析し、ブラウザに送信
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0].text) {
      const themes = JSON.parse(result.candidates[0].content.parts[0].text);
      return res.status(200).json(themes);
    } else {
      throw new Error("AIからの応答が予期した形式ではありません。");
    }

  } catch (error) {
    // 6. エラーが発生した場合の処理
    console.error('サーバーでエラーが発生しました:', error);
    return res.status(500).json({ error: 'テーマの生成中にエラーが発生しました。' });
  }
}
