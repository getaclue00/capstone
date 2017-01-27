class ModifyUsersTable < ActiveRecord::Migration[5.0]
  def up
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :telephone
    remove_column :users, :client
    remove_column :users,:employee
  end
  def down
    add_column :users, :first_name
    add_column :users, :last_name
    add_column :users, :telephone
    add_column :users, :client
    add_column :users,:employee
  end
end
