# This migration creates the `versions` table, the only schema PT requires.
class CreateVersions < ActiveRecord::Migration

  def change
    create_table :versions do |t|
      t.string   :item_type, item_type_options
      t.integer  :item_id,   null: false
      t.string   :event,     null: false
      t.string   :whodunnit
      t.text     :object
      t.text     :object_changes
      t.datetime :created_at
    end
    add_index :versions, [:item_type, :item_id]
  end

  private

  def item_type_options
    opt = { null: false }
    opt
  end
end

