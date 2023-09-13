import React from "react";
import HTMLTemplateFormEditor from "./Component/HTMLTemplateFormEditor";

const htmlDefaultValue = `
<div
      id="open-invitation-container"
      class="position-absolute w-100 h-100"
      style="
        z-index: 999;
        background: url('{{ "type" : "image", "name" : "bg-image", "label" : "Background Gambar", "value" : "https://www.hindustantimes.com/ht-img/img/2023/08/16/1600x900/carly-rae-hobbins-zNHOIzjJiyA-unsplash_1692174931558_1692174951265.jpg" }}');
        background-position: 50% 50%;
        background-size: cover;
      "
    >
      <div
        id="open-invitation-content"
        class="d-flex flex-column justify-content-center align-items-center"
        style="width : 100vw ; height : 100vh; background-color: {{"type" : "color", "name" : "bg-overlay", "label" : "Background Warna Overlay", "value" : "rgba(0, 0, 0, 0.5)"}}" 
      >
        <h1 class="text-white">{{"type" : "text", "name" : "title-open-invitation", "label" : "Judul Undangan", "value" : "Undangan Pernikahan" }}</h1>

        <div style="margin-block: 25vh" class="text-center">
          <h3 class="text-white">{{"type" : "text", "name" : "subtitle-open-invitation", "label" : "Sub Judul Undangan", "value" : "Happy Wedding"}}</h3>
          <h1 class="text-white">{{"type" : "text", "name" : "couple-name", "label" : "Nama Pasangan", "value" : "Shiro & Naoumi"  }}</h1>
        </div>

        <div class="text-center">
          <h5 class="text-white">Save Date</h5>
          <h1 class="text-white">{{"type" : "text", "name" : "event-date", "label" : "Tanggal Acara", "value" : "23 . 10 . 2023"}}</h1>
          <p class="mb-0">Turut mengundang</p> 
          <span
            class="text-white"
            style="
              font-size: 2vh;
              font-weight: bold;
              border-bottom: 1px solid white;
              padding-inline: 2vw;
            "
            >Kepada Yth. {{"type" : "params", "name" : "to", "default_value" : "Bpk. Herry Hermanto"}}</span
          >
        </div>

        <div class="text-center mt-5">
          <button id="btn-open-invitation" class="btn btn-lg btn-success">
            BUKA UNDANGAN
          </button>
        </div>
      </div>
    </div>
    <script>
      // document.body.style.overflowY = "hidden";
      var openInvitationContainer = document.getElementById(
        "open-invitation-container"
      );
      var btnOpenInvitation = document.getElementById("btn-open-invitation");

      btnOpenInvitation.addEventListener("click", () => {
        openInvitationContainer.style.display = "none";
        document.body.style.overflowY = "auto";
      });
    </script>
`;

export default function HTMLTemplateFormEditorPage(props) {
  const [html, setHTML] = React.useState(htmlDefaultValue);

  return (
    <HTMLTemplateFormEditor
      html={html}
      onChange={value => {}}
      onUploadImage={(e, setImageUrl, setLoading) => {
        if (e.target.files[0]) {
          const url = URL.createObjectURL(e.target.files[0]);
          setImageUrl(url);
        }
      }}
      wrapTemplateOptions={[
        { id: 1, name: "Template 1", upperbody: "", lowerbody: "" },
        {
          id: 2,
          name: "Template 2",
          upperbody: "<h1>hello world</h1>",
          lowerbody: "<script>  </script>",
        },
      ]}
    />
  );
}
