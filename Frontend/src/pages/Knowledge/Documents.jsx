import { useEffect, useState } from "react";
import api from "../../services/api";

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewText, setPreviewText] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getDocumentUrl = (document) => {
    if (!document.fileUrl) {
      return "";
    }

    if (document.fileUrl.startsWith("http")) {
      return document.fileUrl;
    }

    const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
    const backendOrigin = apiUrl.replace(/\/api\/?$/, "");
    return `${backendOrigin}${document.fileUrl}`;
  };

  useEffect(() => {
    let isMounted = true;

    api.get("/documents")
      .then((response) => {
        if (isMounted) {
          setDocs(response.data.documents ?? []);
        }
      })
      .catch((documentsError) => {
        if (isMounted) {
          setError(
            documentsError?.response?.data?.message ||
              "Unable to load your documents."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = (id) => {
    const currentDoc = docs.find((doc) => doc._id === id);
    const nextName = window.prompt(
      "Edit file name",
      currentDoc?.title || currentDoc?.filename || ""
    );

    if (nextName === null) {
      return;
    }

    setDocs((currentDocs) =>
      currentDocs.map((doc) =>
        doc._id === id ? { ...doc, title: nextName } : doc
      )
    );
  };

  const handleDelete = (id) => {
    api.delete(`/documents/${id}`)
      .then(() => {
        setDocs((currentDocs) => currentDocs.filter((doc) => doc._id !== id));
        if (selectedDocument?._id === id) {
          setSelectedDocument(null);
        }
      })
      .catch((deleteError) => {
        setError(
          deleteError?.response?.data?.message ||
            "Unable to delete the document."
        );
      });
  };

  const handleDocumentClick = async (document) => {
    if (!document.fileUrl) {
      return;
    }

    const selected = {
      ...document,
      url: getDocumentUrl(document),
    };
    setSelectedDocument(selected);
    setPreviewText("");

    if (document.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setPreviewLoading(true);
      try {
        const response = await api.get(`/documents/${document._id}/text`, {
          responseType: "text",
        });
        setPreviewText(response.data);
      } catch {
        setPreviewText("Unable to load document text.");
      } finally {
        setPreviewLoading(false);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      {loading ? <p>Loading documents...</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {!loading && !error && docs.length === 0 ? (
        <p className="text-slate-500">No documents uploaded yet.</p>
      ) : null}

      {!loading && !error ? <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc._id}
            onClick={() => handleDocumentClick(doc)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleDocumentClick(doc);
              }
            }}
            role={doc.fileUrl ? "button" : undefined}
            tabIndex={doc.fileUrl ? 0 : undefined}
            className="bg-white p-4 rounded-lg shadow cursor-pointer transition hover:shadow-lg"
          >
            📄 {doc.title || doc.filename}
            {doc.fileType ? (
              <p className="text-sm text-slate-500 mt-1">{doc.fileType}</p>
            ) : null}
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm text-blue-600">
                {doc.fileUrl ? "Click to view" : "File unavailable"}
              </p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(doc._id);
                }}
                className="text-sm text-slate-500 hover:text-slate-800"
              >
                Edit name
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(doc._id);
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> : null}

      {selectedDocument ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedDocument.title || selectedDocument.filename}
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedDocument(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-3 py-1 text-xl text-white"
              aria-label="Close document preview"
            >
              ×
            </button>

            <h2 className="mb-3 pr-12 text-lg font-semibold text-slate-800">
              {selectedDocument.title || selectedDocument.filename}
            </h2>

            {previewLoading ? (
              <p className="p-6 text-slate-500">Loading document text...</p>
            ) : selectedDocument.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <pre className="max-h-[75vh] overflow-auto whitespace-pre-wrap rounded-lg border bg-slate-50 p-6 text-left text-sm leading-6 text-slate-800">
                {previewText}
              </pre>
            ) : selectedDocument.fileType?.startsWith("image/") ? (
              <img
                src={selectedDocument.url}
                alt={selectedDocument.title || selectedDocument.filename}
                className="mx-auto max-h-[75vh] max-w-full object-contain"
              />
            ) : (
              <iframe
                src={selectedDocument.url}
                title={selectedDocument.title || selectedDocument.filename}
                className="h-[75vh] w-full rounded-lg border"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Documents;