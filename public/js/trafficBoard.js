function board(page, container, previousPageBtn, nextPageBtn) {
  $.ajax({
    type: "GET",
    url: "/dashboard/trafficMessages",
    data: { page: page },
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log("error:", e);
    },
    success: function (result) {
      previousPageBtn.setAttribute("page", "");
      nextPageBtn.setAttribute("page", "");

      if (undefined === result.previous) {
        previousPageBtn.classList.add("disabled");
      }
      if (undefined === result.next) {
        nextPageBtn.classList.add("disabled");
      }

      if (undefined !== result.previous) {
        previousPageBtn.classList.remove("disabled");
        previousPageBtn.setAttribute("page", result.previous.page);
      }
      if (undefined !== result.next) {
        nextPageBtn.classList.remove("disabled");
        nextPageBtn.setAttribute("page", result.next.page);
      }

      if (0 !== result.results.length) {
        container.innerHTML = "";
        let fragment = document.createDocumentFragment();
        for (let x of result.results) {
          let card = document.createElement("div");
          card.classList.add("card", "mb-2");
          let cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header", "whiteColor", "blue");
          let userImage = document.createElement("img");
          userImage.classList.toggle("rounded-circle");
          userImage.style.maxWidth = "30px";
          userImage.src = x.user.image.toString();
          cardHeader.appendChild(userImage);
          let userName = document.createElement("span");
          userName.classList.toggle("card_header_padding");
          userName.textContent = x.user.displayName;
          cardHeader.appendChild(userName);

          let cardBody = document.createElement("div");
          cardBody.classList.toggle("card-body");
          let cardTitle = document.createElement("div");
          cardTitle.classList.add("card-title", "flex_card_title");
          cardBody.appendChild(cardTitle);
          let categoryTag = document.createElement("span");
          categoryTag.classList.add("category_tag");
          categoryTag.classList.add(x.accidentCategory.accidentValue);
          categoryTag.textContent = x.accidentCategory.accidentText;
          cardTitle.appendChild(categoryTag);
          let timeTag = document.createElement("h6");
          timeTag.classList.toggle("card_title_padding");
          let localTime = new Date(x.createdAt);
          timeTag.textContent = `[${localTime.getHours()}:${localTime.getMinutes()}]`;
          cardTitle.appendChild(timeTag);
          let roadInformationTag = document.createElement("h6");
          roadInformationTag.classList.toggle("card_title_padding");
          roadInformationTag.textContent = x.location;
          cardTitle.appendChild(roadInformationTag);

          let cardTextContent = document.createElement("div");
          cardTextContent.classList.add("p-2", "card-text", "grayContent");
          cardTextContent.innerHTML = x.body;

          cardBody.appendChild(cardTextContent);
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
          fragment.appendChild(card);
        }
        container.appendChild(fragment);
      }
    },
  });
}
