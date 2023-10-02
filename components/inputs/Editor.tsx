import React, { useState, useEffect, useRef } from "react";

export default function Editor({ onChange, content = "" }: any) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    } as any;
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      config={{
        language: {
          ui: "ar",
          content: "ar",
        },
        minHeight: "300px",
        maxWidth: "100%",
      }}
      data={content}
      onChange={(event: Event, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
}
