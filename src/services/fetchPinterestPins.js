const PINTEREST_ACCESS_TOKEN = "pina_AMA3IXYXAAXDGAIAGBADGDYZMVXXNGIBQBIQCGUKFGCBBP3KLOG2MX2ZECH2LIIHKYEQ4E7YLM3EUNEKHI7N723Y6UOZS2QA";
const BOARD_ID = "intentpublishing/travel-board"; // board về du lịch bạn muốn fetch
const LIMIT = 10;

const fetchPinterestPins = async () => {
  try {
    const res = await fetch(`https://api.pinterest.com/v5/boards/${BOARD_ID}/pins?page_size=${LIMIT}`, {
      headers: {
        Authorization: `Bearer ${PINTEREST_ACCESS_TOKEN}`,
      },
    });
    const data = await res.json();

    // map dữ liệu thành format giống Masonry của bạn
    const mapped = data.items.map((pin, i) => ({
      id: pin.id,
      title: pin.title || `Du lịch ${i + 1}`,
      text: pin.note || "",
      image: pin.media.images.original.url,
    }));

    setItems((prev) => [...prev, ...mapped]);
  } catch (err) {
    console.error("Fetch Pinterest Error:", err);
  }
};
