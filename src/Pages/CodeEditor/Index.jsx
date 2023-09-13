// Mengimpor modul yang diperlukan
import React, { useState, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";

// Membuat komponen menu klik kanan
const ContextMenu = ({ x, y, options }) => {
  // Membuat style untuk menu
  const style = {
    position: "absolute",
    left: x,
    top: y,
    backgroundColor: "white",
    border: "1px solid black",
    padding: "5px",
    zIndex: 10,
  };

  // Membuat daftar opsi menu
  const list = options.map(option => (
    <li key={option} onClick={option.onClick}>
      {option.label}
    </li>
  ));

  // Mengembalikan elemen menu
  return (
    <div style={style}>
      <ul>{list}</ul>
    </div>
  );
};

// Membuat komponen editor
const CodeEditor = () => {
  // Membuat state untuk menyimpan nilai editor dan posisi menu
  const [value, setValue] = useState("// Kode Anda di sini");
  const [menu, setMenu] = useState({ x: 0, y: 0, show: false });

  // Membuat ref untuk menyimpan instance editor
  const editorRef = useRef(null);

  // Membuat fungsi untuk menangani perubahan nilai editor
  const handleChange = newValue => {
    console.log(editorRef);

    setValue(newValue);
  };

  // Membuat fungsi untuk menangani event contextmenu
  const handleContextMenu = event => {
    // Mencegah perilaku bawaan browser
    event.preventDefault();

    // Mendapatkan posisi saat ini dari event
    const x = event.clientX;
    const y = event.clientY;

    // Menampilkan menu dengan posisi yang sesuai
    setMenu({ x, y, show: true });
  };

  // Membuat fungsi untuk menutup menu
  const closeMenu = () => {
    setMenu({ ...menu, show: false });
  };

  // Membuat fungsi untuk menyalin teks yang dipilih ke clipboard
  const copyText = () => {
    // Mendapatkan teks yang dipilih dari editor
    const text = editorRef.current.editor.getSelectedText();

    // Menyalin teks ke clipboard menggunakan API navigator
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Teks berhasil disalin");
      },
      error => {
        console.error("Teks gagal disalin", error);
      }
    );

    // Menutup menu
    closeMenu();
  };

  // Membuat fungsi untuk menempel teks dari clipboard ke editor
  const pasteText = () => {
    // Mendapatkan teks dari clipboard menggunakan API navigator
    navigator.clipboard.readText().then(
      text => {
        console.log("Teks berhasil ditempel");

        // Menempel teks ke editor di posisi kursor saat ini
        editorRef.current.editor.insert(text);
      },
      error => {
        console.error("Teks gagal ditempel", error);
      }
    );

    // Menutup menu
    closeMenu();
  };

  // Membuat fungsi untuk memotong teks yang dipilih dan menyalinnya ke clipboard
  const cutText = () => {
    // Mendapatkan teks yang dipilih dari editor
    const text = editorRef.current.editor.getSelectedText();

    // Menyalin teks ke clipboard menggunakan API navigator
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Teks berhasil dipotong");

        // Menghapus teks yang dipilih dari editor
        editorRef.current.editor.remove();
      },
      error => {
        console.error("Teks gagal dipotong", error);
      }
    );

    // Menutup menu
    closeMenu();
  };

  // Membuat fungsi untuk memilih semua teks di editor
  const selectAllText = () => {
    // Memilih semua teks di editor menggunakan metode selectAll()
    editorRef.current.editor.selectAll();

    // Menutup menu
    closeMenu();
  };

  // Membuat array opsi menu klik kanan dengan label dan fungsi onClick masing-masing
  const menuOptions = [
    { label: "Salin", onClick: copyText },
    { label: "Tempel", onClick: pasteText },
    { label: "Potong", onClick: cutText },
    { label: "Pilih Semua", onClick: selectAllText },
  ];

  // Membuat fungsi untuk mengaktifkan fitur auto-completion
  const enableAutocomplete = () => {
    // Mendapatkan instance editor dari komponen AceEditor
    const editor = this.aceEditor.editor;

    // Mengaktifkan fitur auto-completion dengan menggunakan metode setOptions()
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    });
  };

  // Mengembalikan elemen editor dan menu
  return (
    <div
      style={{ height: "300px", width: "600px" }}
      onClick={closeMenu}
      onContextMenu={handleContextMenu}
    >
      <AceEditor
        ref={editorRef}
        mode="html"
        theme="github"
        onChange={handleChange}
        value={value}
        name="editor"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        editorProps={{ $blockScrolling: true }}
      />
      {menu.show && <ContextMenu x={menu.x} y={menu.y} options={menuOptions} />}
    </div>
  );
};

// Mengekspor komponen editor
export default CodeEditor;
