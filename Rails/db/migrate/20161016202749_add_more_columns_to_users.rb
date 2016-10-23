class AddMoreColumnsToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :first_name, :string, null: false, default: ''
    add_column :users, :last_name, :string, null: false, default: ''
    add_column :users, :telephone, :string, null: false, default: ''
    add_column :users, :client, :boolean, null: false, default: false
    add_column :users, :employee, :boolean, null: false, default: false
    add_index :users, :client
    add_index :users, :employee
  end
  def down
    remove_column :users, :first_name, :string, null: false, default: ''
    remove_column :users, :last_name, :string, null: false, default: ''
    remove_column :users, :telephone, :string, null: false, default: ''
    remove_column :users, :client, :boolean, null: false, default: false
    remove_column :users, :employee, :boolean, null: false, default: false
    remove_index :users, :client
    remove_index :users, :employee
  end
end
