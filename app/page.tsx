import { Button } from "@/components/ui/button"
import { Search, Star, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react"
import Header from "@/components/header"

export default function HomePage() {
  const products = [
    {
      name: "Newspaper",
      price: "₹10/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0nC2skXEjkQdqp9jrfbdRRiFQSiRQ8MFWNeZKuoY8LWVB3LQgKG5nw5krqWTMbgsyDaUrrlbDJbd_YZAoJB-BCmYZzJjPhDPFTuPAYH6IEx1cUvztaiWmBzBRa4HfXEuYuPvi9Ptzly5bhEUvh9pBP8He0z3XkegtCuX-ZmJIlT1gz_-h3rlX1NVD7-8W2RotBA2N7K4GkqcpvM3POdUVHn7Z3W4JCIfKJ99ob2cgBeANuCq4fQJlfaT81uYorZ4wCckT0eIhmbBF",
    },
    {
      name: "Books",
      price: "₹7/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ZRa5EXaGUjBDpwv6JL7z5VvbnBde7KeBZqwEcl4FaWHSeh8Ms0Dnooxc4Lc2w6etgiPhVVoTThVIcql4_2sLZbCAncELuzc7Q2cjKjRv0MkxqDDRY5XOyaGH-6L1-bGREtKGHsDQaAl-Jkr39P3n5rI8J8IQ0U84_5z8zTKkQFYGS5PF9RPiMNx9QIKs0By5hKG-xaOqmHF_E9WYrPnKM3shOPhAdkC_UZsi-pmsnUslrYEu_kdXBUH4QgUHj7bF25R4wXJf9PsP",
    },
    {
      name: "Plastic",
      price: "₹7/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCAGWUqS2idDwGNhpPQJ_E9lcrGLk3UGRgNNO7Zx3RHw1bgmiD4eNfd5SJBuvSacHJZqvAuhUUKRsvqK7H2iBZR66Dl4hZO3esanBN2s4o9R6tuQ4iflT8QNnhpFUnru8pBLGGu4tPvyZhrkThhBTa1DJkI-6kwcpTahTaBprlG6wEJwKQZlmmhwIL2-DhCttMKUJzY2Dz0Gs27Pfq30UFCdrY5GsBHQP6radptLc4sw3Iq_qNwZayyLU9ZIPq2u6RYiaoqvGbXaHaY",
    },
    {
      name: "Hard Plastic",
      price: "₹2/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDXufoIczc2YORnrwyNvmv1pEgeS1aOsGliTnRglwWMOkdGQk5N5DXijmFG3T6tA8NH7matZQ_0FJnFhb6APzHAWcbammLN_g4OMwRh402jojnIQK1rtz49TrZYU7Vv1ZHN_EEHIU42a7eZF5wYyz56g00W8nFEUGXTfCSWXrRtYYhzGQEQ8fXgCqdooYcQtowPv5J3RT4qWlKTN7pbLYEgKFOfdLAufkia6he22CDXD4husVTSjRYHCF9_rLtnbJ0d9SLz9B8pqt9n",
    },
    {
      name: "Cardboard",
      price: "₹4/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDslyKdpe6XByQQI4rRD4C4BdSaxaFZESAq7e8-HAI2G8n6usKVbtyy_yD4a_WtwtpjJY0eOlGvUQJ2tQb1EC7PEufRdVBn5CIVserUkLfc-KlqAhVDWgahDsh61XyLk89aeoIeKdBHopa6DBoPxlC4mQCfOlrxqDZ_p8ZakqW9E7194_SGq_1zvGXMZWDwWwmoGzoot9ww_MvBvF8tHaG01aojHyKGHxSHflIHKUQfxO5U6YpGs3cYOtqqLRS-c3aW-SjPoeIKMORB",
    },
    {
      name: "Iron",
      price: "₹22/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBKX-XTSDXX8DmHmAcCy-bH4MRHOV8I2YXIYxyQeTzYSho7NyEpMdq9F3E0k5JLyI_slI-qdlAkiYruSOwa-xyt7sQBYj3gWHXOmQGLfLVReLNY0jTyDF8uoOmPpP_rFY-kb7itBoC0XhjmZ8kQ3oczIWSNuPvxBSVPLV9P5GQMxzIMnjA84alw7zPxJsBggMXLAnDUgNajV4qZP31LCeo1Mjg12N8mYM1cWifldjfEf257Ggw4GD4Ydb68jyEq1Y2voQlNnBfAp4yW",
    },
    {
      name: "Tin",
      price: "₹16/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCa-V7dSxdmd_8T9ScM6g0-SIdI4i-drXZvACyA0x_IMg1jyCwsLERVavqs_FfTqEmyQvnYd4a4x59lNXkvugY5GmpRC9pVJSj0SiD5dTcifcSQ3LhjpYXdWFcv5jyVub3CGo4ZPzNhIeBV8JAbyMiB5NIOsP_N2G0jXkc_4cJbvnpoQcL92Wb9H4sv0GhYFt5qEJu-rqTMV7EwwRKWN7Kp6PJUkIRbPwzQYUkTAzwvkn338QZzx1TWnWRS5wJkjCkqVlGRQm68lJjH",
    },
    {
      name: "Copper",
      price: "₹600/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGe7qb9HnBJfODRMT08RWRJxgmH8TzyHySHKQmbg_6o0yBczvWu59pBExmTVBtafaoMcQRJgsV3WKIgRLDKr04MTQnmpzLHUJyfyPIxjiAeBFCQb6-J9LYjeEuUdKdqE5zKS8RK5qB45NK2GT_lxpjuqvACJr9hW_Eg0K9dWHZ4unVTeym-ApX7fZDhZK6ggwhzhhX09Inyis70SiNiEND3yBzNoItmDGDUyhZOkKeWjh5FQe31vK1ASM4_rY7dl-9uHeiCIptQgGe",
    },
    {
      name: "Brass",
      price: "₹400/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBHGOvzdCZIZZjzTNWTENlNo9BVqHm5jh1iywoH-1VEg1rVXR5zWQUmU_C9J9n6JJZVFpXLJih9MXPm6I9elAHitKeGmjAl8rbHcXFCD4i3VXFn7mYLVT2W1Aui6xMuuqoe7YEXZwptR8dGgyBzfCqvCV1yNwx9f7HdmTXLb0nUhc-oAknnO9NzqpweI1MtFPbXusGWlMti3McqGbTzAUgAsTYxGZXZBGCO-xuQNhv4f1MJqk3EGsOwsNG0WyNC0CNTE67AGsrBWD5A",
    },
    {
      name: "Aluminum",
      price: "₹140/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDKFz5RN7rNLfg6lTbfEyn0M2-mVAX7v7iziCW6xL5FjMUcGWh9EcFYbdEs_GYW3caAvekwFG7wgJhS_58YkFppoLPNpUTYFpgpicRq8miWRbhaH0ItLviitvCevEBZ44NNV5V2lI3NgnW3CeVnEC-aPNLS-Wk3gd-g5Sug8dZguYpEsgSUVa40fcIlCKalWdX8wPUizWX-FG8wFKr4Q9KUjLDbt1665-w0NU6dtykh0xWGMPtvGXNOu8WJvsO0R0KR2ffwChq9hAHF",
    },
    {
      name: "Stainless Steel",
      price: "₹45/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD6YDTJq2vAaJxOzAEuKhcjs0RtGfe5isyjp0KbIqId2xHuYqIKn8-dco9SInIav_PRDgyv4VFJ4AxslRg5gvWMJZ3MBbECSf1l10T1P_WGhsYNTOGmSURhneNA-EkdSVa3shBzA0T7vMkuy2UFld0JBeji5A8aMgRmXZQmVCCjA9kLriAgv2owJ3G6QTZKZGNUisvZ8U4tmcl7PB7tUzijHRx4o44MBsP7X-X0RRHCN-UGfi68TEB01w5nIet61s1jvPM5JJ0QZHt9",
    },
    {
      name: "Split AC Unit",
      price: "₹2500 - ₹4500 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAVCF8Y0HfthkPmKzx79A0xbGA7PEtiMD5o3jL1Ec1ULVBgobewH_C7FXOU7yv2GYH7xgO-wvo02ox3xEm2bIxeEyebsvvb6seurbVbw8yOMHVQK2BXtYeE8D-v1UGIe4fYRgp7ROsAp8yQNFEtKe8BmEAQQ5xPwAyol1cf73kUcar_MfnJRQiIcdT4v6e5XzmfVYu7lMrkYWyM2SjozER2eWZXcmdWoP38tFRofifYquq-vKoFjn2I_rffnQiE5F1rVNqWXseSB9jR",
    },
    {
      name: "Window AC",
      price: "₹2500 - ₹4500 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDHzAEBYLL3sUUy1hMkyB7lptV036PIyy4oN3N9V6JsbVUEbluwPgANP8BC5MFGyspkVpPclJ90ZQHVX5mVYjf_wBfu8-g-77vYb2RI8NKki7hf9YkAUE7mg46nF5rfinNPbEGxVfdUcNTnuTfc13__JuI-ihuesyrH8zYa6V2iT5VVYdklm55Uo_VNzOyqSESENowmU7aUpta65InG1ft-ELLO2NzPEb3tkfUl7FYU1GPXvRI7DFGVPxV_i627YEkyk9VbHyY1hXaN",
    },
    {
      name: "Portable AC",
      price: "₹2500 - ₹4500 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA0n1RoZwT1VXICCrksgXfr9Zwjv-SmShm9nFlMlGi1m_1d7gNamuaffclV6JV59s5leMP2YB9api44vcQXM3Yjo2mva9_lO2sVcth9dLFXuyH13gp-_odDS8WvzH7nN0SWdAxbUNOaKR7Wfz7_X_0_DtoiZn50lB1jDEotFhhxOZmwGC1c5MlEKOXwSxzQNm9Fi3qDAqXHA2OwfKNWDSHG7U0RHjVRdpB2YamWWSSqJxWfaV7hilBYwew-nEK0u6Kw1prpWlHF0GxA",
    },
    {
      name: "Battery",
      price: "₹80 - ₹130 per kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2wZBMwHc_SzzY5rsL228YSI6kzFByR5p_zG-4Jtx0Hhq-dy8sNxTjv8qFVUrxviZZLxDm1jjxTlh5k1SaibGQ506Xijo5dhRQtTyvpSWgG-C8NqxqC_OBoo5_2HQKWf5N3Ap62uiRaPNDkFeEVoZBZA9A1_X5vt7Gd57ioTU8jnTuQ5o1i18QDhCOfr-zgu_0qKV3iIK3HWc3z9eNlaf95C3yD1Q7JhAHisL6LK8R1Nj4a79XDmQhD_M6jPte3jREdMvCkHgodtsA",
    },
    {
      name: "Electronic Wire",
      price: "₹100 - ₹300 per kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3e6HfF5DkwrWKzXg61dsySUJRVe-op6cf_wL5hiXObxRdRvl9VqPdYC0YeCp_EKbpDGdgwCGAm8CeBvpKT6iMrxfgwhew1GsgOpaeEMeHrO6Ly-40Vyl7GvAjfmwtkdh4rcZN0lklBwgxp1aS8_Q9EyoWBNm7vsyPjk5hoOIJeI4Yc6ZxNFSSZEZWj8-O3jm9vRHxdVtYuvBn83y191aJoMWRA4S3PNW_01H4yhrkW3ZffrNFkIko7aXyqEQaoSjzXdRpi7Phujhw",
    },
    {
      name: "E-waste",
      price: "₹20/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwNp0ia4qu7wXWFoVNb_KmQQxNBOtEiFKy04m_MUEVlyxSd-vHNIIwtMt2tHJtK4ChA0Duk586S7EYQpGJowOYhcziaKwuYhNd5gQtl-dcBPgoeNCjUfZbNLBn_aP9BRGhZb-uKkviRbxlXDy87RRhNgrUyCwQMUaBY0Cb-vF55rGFM5YHkHjwJy2TNh68WxS9_QLkCqCw4cCRkCozkP-s7n6gJwggMKvuBCjLEUP2RhjqH_LZZIQriPO6p951A9IkatkC3wUzFZv",
    },
    {
      name: "TV",
      price: "₹100 - ₹1000 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfC97OwCNvJ0A6Xis3LTvpdhkLG3id6r_-ajCddUVmMt4IXZMw0aHX7GpKBMK9BxV8BrroH8NgWiFHpJlzRZm-Frm4vQYCVgEMVKD37Gak7WsvEK9UDDtYdMxNcql1h-7RTRYaa4sdWX9Csui1jxX7qRs5-l-Frao4BSqwKww-UyTIlJpZGdcfdWdXvIwoSk7MXQ9MX_-tSaTxdppXgPZW1U5ReOe1J02Ax4aM1nrhkF_3igGYoE1y8-2hw8JI7ese-V8PwHCRcPHd",
    },
    {
      name: "Laptop",
      price: "₹150 - ₹5000 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnWlnT3-VLpYza2jADqCgK0DFT_hO_TrdbaZTKwo0NFfb6GtVDLcR6TsL1OKAHd_XLKuZS1l_pccrugNOTkNxDdM0VaGEuYUIaCsyfeJ2-Q8C0gr5rR4nj0bS5yoSwpHahZJAAniAdHcFG2Toi8izQkiS9p835FUSMHCq23VpCAINCboS8OF0hZRg3cM184sZXUO3iX2elY-fvfvCatbqGjf0FBWEp5QNEy6WTAarOkqh_B0TNbEOF5sNL3EJfHvSSS2hJVsKHZH2X",
    },
    {
      name: "Mobile",
      price: "₹15 - ₹50 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAViDRpleO8ZbSl9lXbohB0msfXef8K-gLIwOjxV0OK3oafSr9LLlo9jmu4rM7e5FRcWQKy4ScPHFOr4nWQGNzmX5LSXcXCLooPJlKGgfFzUNnXjtft853DFGWVX9lDqY-Pe-3lSYZ0yfvXxZWgZm4gwVglu7AxGd9AJ8UKexu4mITqCqAAAAWcTMFg8xyMMLFV2i3Es5Q-idAIoLx-tghfblP4RrFHCv5CczqTFwjj-53X1PBtO21L-KafKmTa5uUTYKLXpkSermX5",
    },
    {
      name: "TV LCD",
      price: "₹100 - ₹200 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBxnpVTEOmtcap1DGCfQrqyg-xOX2_M2PlOrj5jgROdlYJbKAykWOO3XuvULUiJzy2ELxmmCSC3Og3vCjF2YdDmkOHt1zgGpThOoIpeFFPLsbM3uMi3a-EoIoe72RhZLGl8n7buRKeit7MT8gfjQsVG4s1lsQgBOXHq7YuvvhY1CawIjbequgyBuld-A_QSp8y-m_Q2iM86L9jcP4E3vRn7UwvWuX8R3FzlXSqYTYd7zuW5SgYdqN5TMxoUSNbgKfGAyUZIiJE6C9dX",
    },
    {
      name: "Monitor(CRT)",
      price: "₹200 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEeK4NuciMIFRBDNzfJJScIcUjxex7Po-p1Mcy6Cs-L8SuVHNbfYg2UH97FBmJ9vmcwrodA1ZRBQHYrYU9L-GuhsTvW1c-PV2CcMC-UtpV1M-6L0P_7LEiHR3UAe9XRUB2s9NStFQ9u7WUviHlwAgXZT9OqV9vCrwS1rHH0W1kvdx8dOXj8nKtpW0uUGraZ_2PRZwtXUJnl6bjYmdSH7JdDggNSuMsMD5dAsZgnDXEIVji2lSbKByC2pceYmzAFNr8bWlEscCNvnzm",
    },
    {
      name: "Monitor(LCD)",
      price: "₹20/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4SM7C6yfuNjEeah4s11VK44bbOOJUxjP4Lbp601NFaK8cI9zFTyPgmgNNJr0-q6NAZlvhZl_ngEpOn7cPlGvBbCXQcKDD7bEbQaTGtUzIDlSL0PFA0pAIsJ0wSiR0lh9m5W7Vn0l1f82ITj-WBTSHMrodgZtR3_f8d8Q1fsMxKdb9Z_4AaEvkeDKvriWjZklYjQX3NopJYCY5EC8m6iidIj0Vj1V1BZcrzgVFJdjJ9DsSFEncfFDZAzLymjwHwWyUayKzcHPTXuyo",
    },
    {
      name: "Fridge",
      price: "₹500 - ₹5000 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1g3uXbPkabxqNm8Ez5V4nKJvlgsWA_A-g6VG39XmN5m-FIdUQG2qPYLG1hiJuLIk7yDKMSqzXK-4Tn3TU2OmdiFKXLeFHAcXuWpOjErwGKMuhZrREXuR7TQdBKreAJwFriPUbZwp45KDvSA-hfrLpPr7mqF6EB1o38iL0jJ1bjsnYQ2x4YCuHrzR47ch0Kwj5GeW1ZrSStGojNgenbvOzpKJ3V48f_AaE1Y9b_6YLiUCh7U6ZNhQtNdReuui684K1s1zCVayxeFll",
    },
    {
      name: "Front Load Washing Machine",
      price: "₹800 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCAU9p8I9jReqswaLb9qRmxgx7obR1RDefnSxHs9ZqtzkT-8ouDJ3i1apoxr1VwEKkCY794lJsKQI2VEmWVE7kFjZwfiXdP9ayFzj0KqpfIv4j5Ox69ydZVNEMV6N-8CFc58EE-14hL3Ceu66oFNeTzL_E0AZGP-Zc55SeQlIv44q_scjKMjnwevRLQYmdh7rTsOZUUiUB3HtGTe7lnNUgrg6pliHhAOOLQdzQAHwAI_X9v3xcelQM-GamP1Wtd-64KXisXZjf7Lntc",
    },
    {
      name: "Top Load Washing Machine",
      price: "₹700 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1NFKONm-OglZDPTqTdhAXjjjMZqh6UTggvtNP1-lWHcJ_6M9WpwMJp_5Vfx4CGnZ7V3CyLbA7DWlw_QAGLyjh-Dg3ehF_1Q9LoGnX7AkKX0vk-x6XkQX0kpGslRVYh5N2xUgCf3zeOOwoyRk9zU6wzUbE1voVYnOMnY5FvOQH1MyHqrbWxDwSoIB7enpYE9ujUPjspxqJ9eoFuec7a-ZdHyb7bDsI7JuZBm5ejBSmgde_zgE0r3suxSSRH4LjqPA2t636KDrX8ezK",
    },
    {
      name: "Bike",
      price: "₹1000 - ₹10000 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBS10My2MK269MvZXZlSIuKmnbkYbWYo7N8z2Ypac6joEQHcDdXlNXQ2Bmt40s9cmHlIbsTN43toq2OKncAf3lYBiDVuyuo7zr0ICP0Cxct3DqF1oiNL3V1nAsTazsP4___vPRYqUmly_T_CgHySHjrdyXDn0dZJsutAksiKImRyPMyHROemsHovExt86qEw5Znl5QRHyVWQb1f02mpGTEp1WzyLOr4iw7lMI52AqQdoY4uKGAJCahedb99-BlKHPDNWdaiW215gpcg",
    },
    {
      name: "Dish Washer",
      price: "₹600 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDP9Vd_hTugPyGU7AuEPUnFKjt-mt_tk5nHuiyt3UTGiB5MFrkn9p-PDmLnh_0OwU39fanVZnsOGfK_pL2zEE7WpW3J6-ISys0zQVOolEbu9rMc-yJNCgV-KQbnCmh1LJpNE8oNFCQONbUMu6Or-L01akvbZ9BgklJSID9bchgXbYYbEKuikHMDYSAKv0h5NJpXwfczeukeIXOw-oRy1OiuQ3CmzkenPKbs7L0fvn7N_3DEMUs8-fWcJB5GrIhNMna7XdQyvP8J0tz1",
    },
    {
      name: "Microwave",
      price: "₹150 - ₹400 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuChUuNY3HZtwNot631rMZwqlvynQgkX5KTq1hrCvJ3cvE1Q3SQdw5Df0DElfliVGLbvGWPwOfOZIani6l26CLD65VzE4J4Bq1gAtOROiqxyjfeD5cPXtFhGy2J3NhZuKC1zS5ClWTs_m1-VwY5LvyuLhfwLDTlEvFke9ifBX3coX1H6CFY534NJnforqpln8VukOcrHNTcjzVwzTkfc67UxDa4smCxzpoBAHGLjLAo3hn11c7WBZMYnGTsu--mPdZxng3UAw9XpRJFf",
    },
    {
      name: "Air Cooler",
      price: "₹100 - ₹500 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwPjA13_RF2Mk48rnBV2E8sqCBuZZaV3PDEV4gzbuuYqBm31a7aRZWEuXuQP8RiFmOJx3quGtYLyQYD3XyCMZJrIt-RT3AfLIiYb_zr0rrlF_9FqDgjXJBe9yrkmmXooEQuPA6dtDQAXjh0dKLMrpdGZHAwcpkcJpg6RwRbWqL4kl1E__DktWsZeVFTBPuFby4NYWzFVLk-MNXgXWwUxfSChC3de0i0sqybf5Pdvipft27jDMu3wUQN1FpzAGY4VsRKBiME9BFDSOs",
    },
    {
      name: "Geyser",
      price: "₹50 - ₹200 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYW6H5GkDvzFDN6gHXRPkt0liAWtuOcL4INkHy3EHZ-oTxA0MoASV--E7dEF77AXxcQqOVyEbqFHpEDqfJDWhFjyD1FGYWyX5vQOR9WMlwXK7JkJ5g5qKUjhjmWudlyl6tmGm0u7pS_gJ19z_njQxY5xisKBRU4ToS8zpk5dcZ45-i7iCB_SvgizEjkmbCpQtc-c4qbvg0wUz_xUAuyyn9soZHGxtBN6GYCm1zwiM8isNr223biuBplhU2aSku1loweIQf9ewvY7Qp",
    },
    {
      name: "Tire",
      price: "₹3/kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDN6AoRQ-8-R-3-ObQh_ROFBMeQGfyDblWHuUi-mhH4wdMuDvra6ClCDT7SoDZ5k_Tu2Y4WjGzNFwSjl1jPDC5xeqL8ikJ_Vgi7HEKgX2tXVvbNuRjI2JB3nkWNWa3LnodA67qAjo-r3_ezu1BJeSPXlCYed-ojecPWcNyLG5k602UwGDzjkPRdF8UMLkrfB9rg8_GTUlvyiXM5AfC_msLpFJQmQDQD7Ds3pJgmyJJRtsyRdmWmDImxll_KtwweQSqR1V-8BKa3g5Rm",
    },
    {
      name: "Furniture",
      price: "₹0.00 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGYX7DhjfqkbPNzLIzTLTChhrGZBhbTl2LZbCdpYhUh57vt9facpp58aAZRuYCmnAWRm1Sd177iQ3ZjNVz0DJw-wGKVeBtAVpW7qXzHGo-IRF0RFA0sv7YDwokZ1guxphEL028HFL8QungvnQug6n4ApV2SPXB53P66oVcIZg5lNnUko61wwerv-tuivGLEhPZ_3YEK7HKfJVHyFXYsqw7KKdwgHPGNu5i2qzdQd1xbS6Bbnx31Rqjc0mwzKa548cwmJCtnw1ENVR5",
    },
    {
      name: "Cloth(Donation)",
      price: "₹0.00 per piece",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXAxD82CIqK2cEbEPJkraSZwf9oRYpOc3InZyoOUWPsza4NlJ2mMgopcfv2of87t97_8g0aw81qXa9kQEssdCegh-UiR0dW-EUl6du1V-GlS5-epy2VR-PMd_Am9yDRLAY0Iii2b8OSr58JHQ5VEm8pDYTglcWkb5mFbLp6hLYbG5OQxsGP3Zrnuo4UnDyuOiuZM4HT0-_4OVSM-xleJEXXgOYy4hZMwJEShFe5Ggfn1iS4q9nyI98Pl2zNhNqjDcBU1i0AvAGxzSF",
    },
  ]

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="px-4 sm:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div className="@container">
              <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-full"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAY9grpiFbzf4_AZpx0gL67jhZQ4zoxWQDCAO3fKsg5Rdr5dECBifU4BEdT6I0KLeHyo0DrTcg61oA6vb51QJq-WeEo9UU2GMieQP9ainvxTMQHmPGNa2yjlj25QLeunUYMPbX42YkrlBHD9IWI74OJuaFUUKvaH2GKWgTUUOeQTustQjOcJl-659HBWJ0_0XNxhStZ5XHkm18oxSclmoA_yiSNKNNYQsLbM8nsFQ-R81KDzAsxKFUh9RdvfE0UYLA0lUjLhFNW2cKF")`,
                  }}
                ></div>
                <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-[#181411] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Turn Your Unused Items Into Instant Cash
                    </h1>
                    <h2 className="text-[#181411] text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Sell your second-hand products in minutes. Fair prices, instant offers, no hassle.
                    </h2>
                  </div>
                  <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                      <div className="text-[#8a7360] flex border-none bg-[#f5f2f0] items-center justify-center pl-4 rounded-l-lg border-r-0">
                        <Search className="h-5 w-5" />
                      </div>
                      <input
                        placeholder="Enter Pincode"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f5f2f0] focus:border-none h-full placeholder:text-[#8a7360] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                      />
                      <div className="flex items-center justify-center rounded-r-lg border-l-0 border-none bg-[#f5f2f0] pr-2">
                        <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f8b782] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-[#f7a66b]">
                          Check
                        </Button>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Products
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {products.map((product, index) => (
                <div key={index} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  ></div>
                  <div>
                    <p className="text-[#181411] text-base font-medium leading-normal">{product.name}</p>
                    <p className="text-[#8a7360] text-sm font-normal leading-normal">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* How it Works */}
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              How it Works
            </h2>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              <div className="flex flex-col items-center gap-1 pt-5">
                <div className="size-2 rounded-full bg-[#181411]"></div>
                <div className="w-[1.5px] bg-[#e6e0db] h-4 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#181411] text-base font-medium leading-normal">Check Availability</p>
                <p className="text-[#8a7360] text-base font-normal leading-normal">
                  Enter your pincode to confirm we operate in your location.
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#e6e0db] h-4"></div>
                <div className="size-2 rounded-full bg-[#181411]"></div>
                <div className="w-[1.5px] bg-[#e6e0db] h-4 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#181411] text-base font-medium leading-normal">Get a Fair Market Price</p>
                <p className="text-[#8a7360] text-base font-normal leading-normal">
                  Our experts review and provide you with a fair market price.
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="w-[1.5px] bg-[#e6e0db] h-4"></div>
                <div className="size-2 rounded-full bg-[#181411]"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#181411] text-base font-medium leading-normal">We Visit & Pay You</p>
                <p className="text-[#8a7360] text-base font-normal leading-normal">
                  Our buyer comes to your location. Inspects the item, and pays instantly.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              FAQs
            </h2>
            <div className="flex flex-col p-4 gap-3">
              {[
                {
                  question: "How do I list an item?",
                  answer:
                    "The selling process varies depending on the item and buyer interest. From listing to payment, it can take anywhere from a few days to a few weeks. We provide tools to track your listing's progress.",
                },
                {
                  question: "How do I get paid?",
                  answer:
                    "The selling process varies depending on the item and buyer interest. From listing to payment, it can take anywhere from a few days to a few weeks. We provide tools to track your listing's progress.",
                },
                {
                  question: "What items can I sell?",
                  answer:
                    "The selling process varies depending on the item and buyer interest. From listing to payment, it can take anywhere from a few days to a few weeks. We provide tools to track your listing's progress.",
                },
                {
                  question: "What if my item is not in perfect condition?",
                  answer:
                    "The selling process varies depending on the item and buyer interest. From listing to payment, it can take anywhere from a few days to a few weeks. We provide tools to track your listing's progress.",
                },
                {
                  question: "How long does the process take?",
                  answer:
                    "The selling process varies depending on the item and buyer interest. From listing to payment, it can take anywhere from a few days to a few weeks. We provide tools to track your listing's progress.",
                  isOpen: true,
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="flex flex-col rounded-lg border border-[#e6e0db] bg-white px-[15px] py-[7px] group"
                  open={faq.isOpen}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                    <p className="text-[#181411] text-sm font-medium leading-normal">{faq.question}</p>
                    <ChevronDown className="text-[#181411] group-open:rotate-180 h-5 w-5" />
                  </summary>
                  <p className="text-[#8a7360] text-sm font-normal leading-normal pb-2">{faq.answer}</p>
                </details>
              ))}
            </div>

            {/* Customer Reviews */}
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Customer Reviews
            </h2>
            <div className="flex flex-col gap-8 overflow-x-hidden bg-white p-4">
              {[
                {
                  name: "Emily Clark",
                  date: "2024-08-15",
                  rating: 5,
                  review:
                    "I was amazed by how easy it was to sell my old laptop. The process was quick, and I got a fair price. Highly recommend!",
                  likes: 12,
                  dislikes: 2,
                  avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBcRbVCQBlRjaFNtrR6KGzqYh7S0n7KJQG4xV76mDfxqRKkiMGulEdSJo4uAlJii5QA6nvNrCyqBhHzEWxjJVR-lcon8fcGMalrsqryc5dzUgSS78nNt9Hy0MFleXziB0YoGmfUFdn1MxeLVwg0f_QqcnPJ8lI5SQ9eVWVvnxAzYc5mbJW1o4mMQZOP6ACcgtiBF4btUdbbGRYjnKNan97yI_NfNZeV6JA1hRwi6m8GD497XaK8EXB10JAucm-68H0coGnwbpLDdtWI",
                },
                {
                  name: "Ryan Foster",
                  date: "2024-07-22",
                  rating: 4,
                  review:
                    "The service was good, and the staff were friendly. The offer was a bit lower than I expected, but overall, a positive experience.",
                  likes: 8,
                  dislikes: 3,
                  avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAa2FXx5s4w1ZkgGamRW5SJbEK8ZHqteVGjQwifPyri1lnjf7N9n-2cbohpe16ocgqR60hHqCO-wEJ-0ghTd0EfNHHxAfiSfFFnlb6pM9-WC1xyQx_zLkv7LbDvCK4l8qZs8HfuzhCpPh3pDRFEhDPpc-Xw7eLk9SSeeciWr4FWK1X-SpiMj_GpLg7GXsnB98IA92icqbMDqVCuAwXvFW5rKvriT3xPCCvIAkpu5hmtudK0wdSpOMke7QkNlJBRbnZTt4pZ6pz2VD5O",
                },
                {
                  name: "Sophia Bennett",
                  date: "2024-06-10",
                  rating: 5,
                  review:
                    "Fantastic service! I sold a vintage painting, and the team was very knowledgeable. The payment was instant, and I'm very satisfied.",
                  likes: 15,
                  dislikes: 1,
                  avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_WeQ0LFwVDCWq9wwNlP1UG149PnPy_DwfnZT4j5FTPVZrwzh-8moqiMfzu3q1xhMSGUXGh0RBqIUMsMTrxevnjbX3iPjOPQvVDCCOAteQ_SIx7kKzPQ9HUK4ZztodtueM0kbxqlWxvzb5ByfHeJrNxSmjmugKly8AS0IMjtwPNTLaOaUa-6asn8YwaFregWONogrug56pMrWUJXoD6mzwaB3MUzXoDY-gALzd_GfCGhhYgftQqqATbXwwTgMAb_Y3UlHZ2xmPeOzO",
                },
              ].map((review, index) => (
                <div key={index} className="flex flex-col gap-3 bg-white">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{ backgroundImage: `url("${review.avatar}")` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-[#181411] text-base font-medium leading-normal">{review.name}</p>
                      <p className="text-[#8a7360] text-sm font-normal leading-normal">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-[#181411] fill-current" : "text-[#cfc3ba]"}`}
                      />
                    ))}
                  </div>
                  <p className="text-[#181411] text-base font-normal leading-normal">{review.review}</p>
                  <div className="flex gap-9 text-[#8a7360]">
                    <button className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5" />
                      <p className="text-inherit">{review.likes}</p>
                    </button>
                    <button className="flex items-center gap-2">
                      <ThumbsDown className="h-5 w-5" />
                      <p className="text-inherit">{review.dislikes}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-8">
              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">About Us</h3>
              <p className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1">
                ReSaleHub is a platform dedicated to making the process of selling second-hand items simple and
                rewarding. We offer fair prices, instant offers, and a hassle-free experience.
              </p>

              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                Quick Links
              </h3>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Home
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Sell
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Products
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Orders
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  FAQs
                </a>
              </div>

              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                Customer Support
              </h3>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Contact Us
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Help Center
                </a>
              </div>

              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Legal</h3>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Terms of Service
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Privacy Policy
                </a>
              </div>

              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
                Follow Us
              </h3>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Twitter
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Instagram
                </a>
                <a href="#" className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 underline">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#8a7360] text-base font-normal leading-normal min-w-40" href="#">
                  About Us
                </a>
                <a className="text-[#8a7360] text-base font-normal leading-normal min-w-40" href="#">
                  Contact
                </a>
                <a className="text-[#8a7360] text-base font-normal leading-normal min-w-40" href="#">
                  Terms of Service
                </a>
                <a className="text-[#8a7360] text-base font-normal leading-normal min-w-40" href="#">
                  Privacy Policy
                </a>
              </div>
              <p className="text-[#8a7360] text-base font-normal leading-normal">
                @2024 ReSaleHub. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  )
}
