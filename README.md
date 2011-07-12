Deface Editor
=============

In browser theme editing for Rails 3.1 (or later) applications.


Installation
============

1. Add the following to your Gemfile:

    gem "deface_editor"

2. Run: `bundle install`

3. Copy over migrations: `rake railties:install:migrations FROM=deface_editor`

4. Run the migrations: `rake db:migrate`

5. Add the following to your css & js manifest files:
    
**in whatever.css:**
<code>//= require deface/embed</code>

**in whatever.js:**
<code>*= require deface/embed</code>

6. Visit: http://localhost:3000/deface


Important
=========

Deface Editor does not include any security checks by default, your application needs to ensure it's protected by your authorization / authenication scheme of choice.

Copyright (c) 2011 Brian D. Quinn, released under the New BSD License
