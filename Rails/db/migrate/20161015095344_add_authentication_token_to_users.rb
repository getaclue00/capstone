class AddAuthenticationTokenToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :authentication_token, :string, null: false, default: ''
    add_index :users, :authentication_token
  end
  def down
    remove_column :users, :authentication_token, :string, null: false, default: ''
    remove_index :users, :authentication_token
  end
end
