import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '', fileName: '' });
	const post = useSelector(state =>
		currentId ? state.posts.posts.find(message => message._id === currentId) : null
	);
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();


	const clear = () => {
		setCurrentId(0);
		setPostData({ title: '', message: '', tags: [], selectedFile: '', fileName: '' });
	};

	useEffect(() => {
		if (!post?.title) clear();
		if (post) setPostData(post);
		// eslint-disable-next-line
	}, [post]);

	const handleSubmit = async e => {
		e.preventDefault();

		if (currentId === 0) {
			dispatch(createPost({ ...postData, name: user?.result?.name }, history));
			clear();
		} else {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
			clear();
		}
	};

	const toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

	const handleImage = (e) => {
		const file = e.target.files[0]
		console.log(file)
		toBase64(file).then(image => setPostData({ ...postData, selectedFile: image, fileName: file.name }))
	}

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper} elevation={6}>
				<Typography variant='h6' align='center'>
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	const handleAddChip = tag => {
		setPostData({ ...postData, tags: [...postData.tags, tag] });
	};

	const handleDeleteChip = chipToDelete => {
		setPostData({ ...postData, tags: postData.tags.filter(tag => tag !== chipToDelete) });
	};

	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant='h6'>{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					multiline
					rows={4}
					value={postData.message}
					onChange={e => setPostData({ ...postData, message: e.target.value })}
				/>
				<div style={{ padding: '5px 0', width: '94%' }}>
					<ChipInput
						name='tags'
						variant='outlined'
						label='Tags'
						fullWidth
						value={postData.tags}
						onAdd={chip => handleAddChip(chip)}
						onDelete={chip => handleDeleteChip(chip)}
					/>
				</div>
				<div className={classes.fileInputRoot}>
					<input
						accept="image/*"
						className={classes.input}
						style={{ display: 'none' }}
						id="raised-button-file"
						type="file"
						onChange={handleImage}
					/>
					<label htmlFor='raised-button-file'>
						<Button variant='contained' color='primary' component='span' className={classes.fileInputButton}>
							Upload Image
						</Button>
					</label>
					<Typography
						className={classes.fileInputText}
						variant='h6'
						color='textSecondary'
						align='left'
						noWrap
					>{postData.fileName}</Typography>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
