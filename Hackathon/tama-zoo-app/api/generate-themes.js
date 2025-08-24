// /api/generate-themes.js

// このファイルはVercelのサーバーレス関数として動作します。
// ライブラリを使わず、直接Google Gemini APIと通信します。

export default async function handler(req, res) {
  // CORSヘッダーを設定（ローカル開発で必要）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. ブラウザから送られてきたプロンプトを取得
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'プロンプトは必須です。' });
    }

    // 2. Vercelの環境変数から安全にAPIキーを取得
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'サーバーにAPIキーが設定されていません。' });
    }
    
    // Gemini 1.5 FlashモデルのAPIエンドポイント
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    // 3. Gemini APIに送信する設定を作成
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        response_mime_type: "application/json",
      },
      // ツールとしてJSONスキーマを定義
      tools: [{
        function_declarations: [{
          name: "display_research_themes",
          description: "動物の自由研究テーマを提案する",
          parameters: {
            type: "OBJECT",
            properties: {
              themes: {
                type: "ARRAY",
                description: "提案する3つの研究テーマのリスト",
                items: {
                  type: "OBJECT",
                  properties: {
                    id: { type: "INTEGER", description: "1から始まるテーマID" },
                    title: { type: "STRING", description: "子供がワクワクするようなテーマ名" },
                    question: { type: "STRING", description: "研究の中心となる具体的な問い" },
                    guide: { type: "STRING", description: "観察のヒントや面白い豆知識" },
                    points: {
                      type: "ARRAY",
                      description: "4つの具体的な観察ポイントのリスト",
                      items: {
                        type: "OBJECT",
                        properties: {
                          id: { type: "INTEGER", description: "1から始まるポイントID" },
                          title: { type: "STRING", description: "観察ポイントのタイトル" },
                          question: { type: "STRING", description: "観察ポイントの具体的な問い" },
                          guide: { type: "STRING", description: "観察の具体的なヒント" }
                        },
                        required: ["id", "title", "question", "guide"]
                      }
                    }
                  },
                  required: ["id", "title", "question", "guide", "points"]
                }
              }
            },
            required: ["themes"]
          }
        }]
      }],
      tool_config: {
        function_calling_config: {
          mode: "ANY",
          allowed_function_names: ["display_research_themes"]
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
      const errorBody = await apiResponse.text();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`Gemini API error: ${apiResponse.statusText}`);
    }

    const result = await apiResponse.json();
    
    // 5. APIからの結果を解析し、ブラウザに送信
    const functionCall = result.candidates?.[0]?.content?.parts?.[0]?.functionCall;
    if (functionCall && functionCall.name === 'display_research_themes') {
      const themes = functionCall.args.themes || [];
      return res.status(200).json(themes);
    } else {
      console.error("Unexpected AI response structure:", JSON.stringify(result, null, 2));
      throw new Error("AIからの応答が予期した形式ではありません。");
    }

  } catch (error) {
    // 6. エラーが発生した場合の処理
    console.error('サーバーでエラーが発生しました:', error);
    return res.status(500).json({ error: 'テーマの生成中にエラーが発生しました。' });
  }
}