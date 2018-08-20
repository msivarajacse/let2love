$(function() {
    $('div#froala-editor').froalaEditor({
        // Define new paragraph styles.

        toolbarSticky: false,
        toolbarInline: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'color', 'strikeThrough', '|', 'align', 'undo', 'redo', 'html']
    })
});