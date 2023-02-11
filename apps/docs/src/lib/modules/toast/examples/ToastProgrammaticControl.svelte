<script lang="ts">
</script>

<p>To update a toast programmatically, you need access to the unique identifier of the toast.</p>

<p>This identifier can be either:</p>
<ul>
	<li>the id passed into <code>toaster.create</code></li>
	<li>the returned random id when the <code>toaster.create</code> is called.</li>
</ul>

<p>You can use any of the following methods to control a toast:</p>

<ul>
	<li><code>toaster.upsert</code> — Creates or updates a toast.</li>
	<li><code>toaster.update</code> — Updates a toast.</li>
	<li><code>toaster.dismiss</code> — Dismisses a toast.</li>
	<li><code>toaster.pause</code> — Pauses a toast.</li>
	<li><code>toaster.resume</code> — Resumes a toast.</li>
</ul>
