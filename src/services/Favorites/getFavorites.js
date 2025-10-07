  export async  function getFavorites(userId, targetType) {
    const params = new URLSearchParams({
      UserId: userId,
      TargetType: targetType,
    });

    try {
      const res = await fetch(`https://localhost:7056/api/Favorite?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      // Lấy danh sách yêu thích
      const data = await res.json();
console.log(data)
      // Đọc thông tin phân trang từ header
      const totalCount = res.headers.get("X-Total-Count");
      const pageNumber = res.headers.get("X-Page-Number");
      const pageSize = res.headers.get("X-Page-Size");

      return {
        data,
        totalCount: Number(totalCount),
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
      };
    } catch (err) {
      console.error("Error fetching favorites:", err);
      return null;
    }
  }
