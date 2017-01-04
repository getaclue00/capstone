class AddReferencesToUsers < ActiveRecord::Migration[5.0]
  def up
  	#this adds employee_id column in users table
    add_reference :users, :employee, foreign_key: true, index: true, null: false
  end
  def down
  	remove_reference :users, :employee, foreign_key: true, index: true, null: false
  end
end
