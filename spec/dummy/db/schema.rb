# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111130123963) do

  create_table "products", :force => true do |t|
    t.string   "name"
    t.decimal  "price",       :precision => 10, :scale => 2
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "spraycan_files", :force => true do |t|
    t.string   "file"
    t.integer  "theme_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "spraycan_javascripts", :force => true do |t|
    t.string   "name"
    t.text     "js"
    t.integer  "theme_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "spraycan_stylesheets", :force => true do |t|
    t.integer  "theme_id"
    t.string   "name"
    t.text     "css"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "spraycan_themes", :force => true do |t|
    t.string   "name"
    t.string   "guid"
    t.boolean  "active",        :default => false
    t.integer  "position",      :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "imported_from"
  end

  create_table "spraycan_view_overrides", :force => true do |t|
    t.integer  "theme_id"
    t.string   "virtual_path"
    t.string   "name"
    t.string   "replace_with"
    t.string   "target"
    t.string   "selector"
    t.string   "closing_selector"
    t.boolean  "disabled"
    t.text     "replacement"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "sequence",         :default => "before"
    t.string   "sequence_target",  :default => ""
  end

end
